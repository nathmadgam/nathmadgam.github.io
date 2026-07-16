import test from "node:test";
import assert from "node:assert/strict";

globalThis.location = new URL("https://portfolio.example/");
const store = new Map();
globalThis.localStorage = {
  getItem: key => store.get(key) ?? null,
  setItem: (key, value) => store.set(key, value),
  removeItem: key => store.delete(key),
};

const media = await import("../assets/js/media-service.js");

test("Discord icon URLs distinguish static and animated icon hashes", () => {
  assert.equal(media.buildDiscordIconUrl("123456789", "abc123"), "https://cdn.discordapp.com/icons/123456789/abc123.webp?size=256");
  assert.equal(media.buildDiscordIconUrl("123456789", "a_abc123"), "https://cdn.discordapp.com/icons/123456789/a_abc123.gif?size=256");
  assert.equal(media.buildDiscordIconUrl("", "abc123"), null);
  assert.equal(media.buildDiscordIconUrl("123456789", null), null);
});

test("Roblox place IDs use the official place-icon endpoint and cache the result", async () => {
  let fetchCount = 0;
  globalThis.fetch = async input => {
    fetchCount += 1;
    const url = new URL(input);
    assert.equal(url.hostname, "thumbnails.roblox.com");
    assert.equal(url.pathname, "/v1/places/gameicons");
    assert.equal(url.searchParams.get("placeIds"), "4512345,4567890");
    return Response.json({ data: [
      { targetId: 4512345, state: "Completed", imageUrl: "https://images.example/4512345.webp" },
      { targetId: 4567890, state: "Blocked", imageUrl: null },
    ] });
  };

  const games = [
    { id: "4512345", idType: "place", name: "One" },
    { id: "4567890", idType: "place", name: "Two" },
  ];
  const first = await media.getRobloxGameImages(games);
  assert.deepEqual(first.get("4512345"), { state: "Completed", imageUrl: "https://images.example/4512345.webp", reason: "completed" });
  assert.deepEqual(first.get("4567890"), { state: "Blocked", imageUrl: null, reason: "blocked" });
  assert.equal(fetchCount, 1);

  const second = await media.getRobloxGameImages(games);
  assert.deepEqual(second.get("4512345"), first.get("4512345"));
  assert.equal(fetchCount, 1, "cached lookup must not request the same images again");
});

test("Roblox place IDs convert to universe IDs when the place-icon route is unavailable", async () => {
  let universeLookups = 0;
  let universeIconRequests = 0;
  globalThis.fetch = async input => {
    const url = new URL(input);
    if (url.pathname === "/v1/places/gameicons") return new Response("not available", { status: 404 });
    if (url.hostname === "apis.roblox.com") {
      universeLookups += 1;
      return Response.json({ universeId: 777001 });
    }
    if (url.pathname === "/v1/games/icons") {
      universeIconRequests += 1;
      assert.equal(url.searchParams.get("universeIds"), "777001");
      return Response.json({ data: [{ targetId: 777001, state: "Completed", imageUrl: "https://images.example/777001.webp" }] });
    }
    throw new Error(`Unexpected URL ${url}`);
  };

  const result = await media.getRobloxGameImages([{ id: "4599999", idType: "place", name: "Fallback" }]);
  assert.deepEqual(result.get("4599999"), { state: "Completed", imageUrl: "https://images.example/777001.webp", reason: "completed" });
  assert.equal(universeLookups, 1);
  assert.equal(universeIconRequests, 1);
});
