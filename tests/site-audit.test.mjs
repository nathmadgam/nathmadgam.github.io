import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = file => readFile(path.join(root, file), "utf8");

function localReferences(source) {
  const html = [...source.matchAll(/\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/g)].map(match => match[1]);
  const data = [...source.matchAll(/\b(?:video|poster|fallback)\s*:\s*["']([^"']+)["']/g)].map(match => match[1]);
  return [...html, ...data].filter(value => !/^(?:https?:|mailto:|#|data:|javascript:)/.test(value));
}

test("metadata, removed sections, and secure external links", async () => {
  const html = await read("index.html");
  assert.match(html, /<title>Cynex \| Roblox Scripter Portfolio<\/title>/);
  assert.doesNotMatch(html, /extra services/i);
  assert.doesNotMatch(html, /id=["']extras["']/i);
  assert.doesNotMatch(html, /tr\.rbxcdn\.com/i);
  const external = [...html.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/gi)].map(match => match[0]);
  assert.ok(external.length > 0);
  external.forEach(anchor => assert.match(anchor, /rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']/i));
});

test("all local files referenced by the site exist", async () => {
  const sources = [await read("index.html"), await read("assets/js/data.js")];
  const references = [...new Set(sources.flatMap(localReferences))];
  for (const reference of references) await access(path.join(root, reference));
});

test("project media is intentionally limited and data driven", async () => {
  const data = await read("assets/js/data.js");
  const videos = (await readdir(path.join(root, "videos"))).filter(name => name.endsWith(".mp4"));
  const posters = (await readdir(path.join(root, "assets/posters"))).filter(name => name.endsWith(".webp"));
  assert.equal(videos.length, 6);
  assert.equal(posters.length, 6);
  videos.forEach(name => assert.match(data, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))));
});

test("frontend source contains no obvious secrets", async () => {
  const files = ["index.html", "assets/js/app.js", "assets/js/config.js", "assets/js/runtime-config.js", "assets/js/data.js", "assets/js/media-service.js"];
  const source = (await Promise.all(files.map(read))).join("\n");
  assert.doesNotMatch(source, /Bot\s+[A-Za-z0-9._-]{20,}/);
  assert.doesNotMatch(source, /(?:token|secret|api[_-]?key)\s*[:=]\s*["'][^"']{12,}["']/i);
});
