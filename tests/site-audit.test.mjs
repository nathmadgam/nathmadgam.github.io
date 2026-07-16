import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = file => readFile(path.join(root, file), "utf8");
const execFileAsync = promisify(execFile);

function localReferences(source) {
  const html = [...source.matchAll(/\b(?:src|href|poster|data)\s*=\s*["']([^"']+)["']/g)].map(match => match[1]);
  const data = [...source.matchAll(/\b(?:video|poster|fallback|cachedImage)\s*:\s*["']([^"']+)["']/g)].map(match => match[1]);
  return [...html, ...data].filter(value => !/^(?:https?:|mailto:|#|data:|javascript:)/.test(value)).map(value => value.split("#")[0]);
}

test("metadata, removed sections, and secure external links", async () => {
  const html = await read("index.html");
  assert.match(html, /<title>Cynex \| Roblox Scripter Portfolio<\/title>/);
  assert.doesNotMatch(html, /extra services/i);
  assert.doesNotMatch(html, /your toolbox|maximum impact|skip the template/i);
  assert.doesNotMatch(html, /id=["']extras["']/i);
  assert.doesNotMatch(html, /tr\.rbxcdn\.com/i);
  assert.match(html, /assets\/js\/site\.bundle\.js/);
  assert.doesNotMatch(html, /type=["\']module["\']/i);
  assert.match(html, /class=["\']contact-icon["\']/i);
  assert.match(html, /nathanielmadridgaminde@proton\.me/);
  assert.match(html, /downloads\/Cynex-Services-Agreement-Fillable\.pdf/);
  assert.match(html, /id=["']agreement["']/);
  assert.doesNotMatch(html, /data-source-download|cynex-portfolio-source\.zip/);
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


test("compact project collage and typed testimonial carousel are present", async () => {
  const app = await read("assets/js/app.js");
  const css = await read("assets/css/styles.css");
  const data = await read("assets/js/data.js");
  assert.match(app, /setupReviewCarousel/);
  assert.match(app, /data-review-typed/);
  assert.match(css, /grid-auto-flow:\s*dense/);
  assert.match(css, /type-caret/);
  assert.match(data, /platform:\s*"Fiverr"/);
  assert.equal((data.match(/role:\s*"Programmer"/g) || []).length, 3);
  assert.match(data, /cachedImage:\s*"assets\/cached-media\/grow-your-pet\.webp"/);
  assert.match(css, /animation:\s*(?:[^;]*)(?:grid-drift|portrait-float|ticker|review-shape)/);
  assert.match(app, /data-live-count/);
});

test("frontend source contains no obvious secrets", async () => {
  const files = ["index.html", "assets/js/app.js", "assets/js/config.js", "assets/js/runtime-config.js", "assets/js/data.js", "assets/js/media-service.js"];
  const source = (await Promise.all(files.map(read))).join("\n");
  assert.doesNotMatch(source, /Bot\s+[A-Za-z0-9._-]{20,}/);
  assert.doesNotMatch(source, /(?:token|secret|api[_-]?key)\s*[:=]\s*["'][^"']{12,}["']/i);
});


test("every project video includes an audible audio stream", async () => {
  const videos = (await readdir(path.join(root, "videos"))).filter(name => name.endsWith(".mp4"));
  for (const name of videos) {
    const { stdout } = await execFileAsync("ffprobe", [
      "-v", "error", "-select_streams", "a:0", "-show_entries", "stream=codec_name,channels",
      "-of", "csv=p=0", path.join(root, "videos", name),
    ]);
    assert.match(stdout.trim(), /aac,2|aac\s*,?\s*2/i, `${name} must contain stereo AAC audio`);
  }
});


test("client agreement is fillable and deploy media caching is configured", async () => {
  await access(path.join(root, "downloads/Cynex-Services-Agreement-Fillable.pdf"));
  await access(path.join(root, "downloads/Cynex-Services-Agreement-Original.pdf"));
  const packageJson = JSON.parse(await read("package.json"));
  assert.match(packageJson.scripts["prepare-deploy"], /cache-media/);
  const workflow = await read(".github/workflows/deploy-pages.yml");
  assert.match(workflow, /npm run cache-media/);
});
