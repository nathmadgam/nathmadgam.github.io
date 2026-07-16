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

test("Roblox place IDs are converted once and thumbnails use universe IDs", async () => {
  let fetchCount = 0;
  globalThis.fetch = async input => {
    fetchCount += 1;
    const url = new URL(input);
    if (url.hostname === "apis.roblox.com") {
      const place = url.pathname.split("/").at(-2);
      return Response.json({ universeId: place === "12345" ? 11111 : 22222 });
    }
    if (url.hostname === "thumbnails.roblox.com") {
      assert.equal(url.searchParams.get("universeIds"), "11111,22222");
      return Response.json({ data: [
        { targetId: 11111, state: "Completed", imageUrl: "https://images.example/11111.webp" },
        { targetId: 22222, state: "Blocked", imageUrl: null },
      ] });
    }
    throw new Error(`Unexpected URL ${url}`);
  };

  const games = [
    { id: "12345", idType: "place", name: "One" },
    { id: "67890", idType: "place", name: "Two" },
  ];
  const first = await media.getRobloxGameImages(games);
  assert.deepEqual(first.get("12345"), { state: "Completed", imageUrl: "https://images.example/11111.webp", reason: "completed" });
  assert.deepEqual(first.get("67890"), { state: "Blocked", imageUrl: null, reason: "blocked" });
  assert.equal(fetchCount, 3);

  const second = await media.getRobloxGameImages(games);
  assert.deepEqual(second.get("12345"), first.get("12345"));
  assert.equal(fetchCount, 3, "cached lookup must not request the same images again");
});
