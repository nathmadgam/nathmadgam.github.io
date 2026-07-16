import test from "node:test";
import assert from "node:assert/strict";
import worker from "../worker/src/index.js";

function installCache() {
  const map = new Map();
  globalThis.caches = { default: {
    async match(request) { return map.get(request.url)?.clone() ?? null; },
    async put(request, response) { map.set(request.url, response.clone()); },
  } };
}

async function invoke(url, env = {}) {
  const pending = [];
  const response = await worker.fetch(new Request(url), env, { waitUntil: promise => pending.push(promise) });
  await Promise.all(pending);
  return response;
}

test("proxy rejects invalid Roblox IDs before upstream access", async () => {
  installCache();
  globalThis.fetch = async () => { throw new Error("must not fetch"); };
  const response = await invoke("https://proxy.example/api/roblox/universe?placeId=not-an-id");
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "invalid_place_id" });
});

test("proxy converts a Roblox place ID and returns only the universe ID", async () => {
  installCache();
  globalThis.fetch = async input => {
    assert.match(String(input), /apis\.roblox\.com\/universes\/v1\/places\/12345\/universe/);
    return Response.json({ universeId: 98765, unrelated: "removed" });
  };
  const response = await invoke("https://proxy.example/api/roblox/universe?placeId=12345");
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { universeId: "98765" });
});

test("Discord invite response is sanitized and does not expose upstream fields", async () => {
  installCache();
  globalThis.fetch = async input => {
    assert.match(String(input), /discord\.com\/api\/v10\/invites\/abc123/);
    return Response.json({
      guild: { id: "123456789", name: "Example Guild", icon: "a_hash", owner_id: "private-detail" },
      approximate_member_count: 42,
      approximate_presence_count: 7,
      channel: { id: "999", name: "general" },
    });
  };
  const response = await invoke("https://proxy.example/api/discord/invite?code=abc123");
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    guildId: "123456789",
    name: "Example Guild",
    iconHash: "a_hash",
    memberCount: 42,
    presenceCount: 7,
    source: "public-invite",
  });
});
