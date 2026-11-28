import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import test from "node:test";
import ts from "typescript";
const resolveModule = createRequire(import.meta.url);
function source(file, mocks = {}) {
  const code = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const loaded = { exports: {} };
  new Function("require", "module", "exports", code)(name => name in mocks ? mocks[name] : resolveModule(name), loaded, loaded.exports);
  return loaded.exports;
}
function contact() {
  const sent = [];
  const { POST } = source("src/app/api/contact/route.ts", { "@/lib/email": { sendContactNotification: async payload => { sent.push(payload); } } });
  let index = 0;
  const request = (payload, ip = `case-${++index}`) => new Request("https://example.test/api/contact", { method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": ip }, body: JSON.stringify(payload) });
  return { POST, request, sent };
}
test("contact rejects malformed, incomplete and oversized inputs without delivering email", async () => {
  const { POST, request, sent } = contact();
  for (const payload of [null, [], { name: 12, email: "a@example.test", message: "test" }, { name: "", email: "a@example.test", message: "test" }, { name: "Alice", email: "wrong", message: "test" }, { name: "Alice", email: "a@example.test", message: "x".repeat(10001) }]) assert.equal((await POST(request(payload))).status, 400);
  assert.equal(sent.length, 0);
});
test("contact preserves the existing delivery contract and trims values", async () => {
  const { POST, request, sent } = contact();
  assert.equal((await POST(request({ name: " Alice ", email: " a@example.test ", message: " [IA] Test ", company: " Test " }))).status, 200);
  assert.deepEqual(sent, [{ name: "Alice", email: "a@example.test", message: "[IA] Test", company: "Test", phone: undefined }]);
});
test("contact rate limiting rejects the fourth request", async () => {
  const { POST, request } = contact();
  for (let i = 0; i < 3; i++) assert.equal((await POST(request({}, "same-test-ip"))).status, 400);
  assert.equal((await POST(request({}, "same-test-ip"))).status, 429);
});
test("portfolio reports backend failure and applies an abort signal", async () => {
  let signal;
  const query = { select() { return this; }, eq() { return this; }, order() { return this; }, abortSignal(value) { signal = value; return Promise.resolve({ data: null, error: { message: "offline" } }); } };
  const { getPortfolio } = source("src/lib/portfolio.ts", { react: { cache: fn => fn }, "@/lib/supabase/server": { supabaseServer: { from: () => query } } });
  assert.deepEqual(await getPortfolio(), { items: [], available: false });
  assert.ok(signal instanceof AbortSignal);
});
test("portfolio classification does not treat an identifier as delivery evidence", () => {
  const { normalizePortfolio, portfolioKind } = source("src/lib/portfolio.ts", { react: { cache: fn => fn }, "@/lib/supabase/server": { supabaseServer: {} } });
  const item = normalizePortfolio({ id: "00000000-0000-0000-0000-000000000000", title: " Example ", category: "hydro", description: null, client_name: null });
  assert.equal(item.description, "");
  assert.equal(portfolioKind(item), "example");
  assert.equal(portfolioKind({ ...item, client_name: "Test client" }), "client");
  assert.equal(portfolioKind({ ...item, category: "training" }), "training");
});
test("local image paths are encoded once while remote URLs are preserved", () => {
  const { mediaSource } = source("src/lib/media.ts");
  assert.equal(mediaSource("/Academy_images/IoT & Robotics Lab.webp"), "/Academy_images/IoT%20%26%20Robotics%20Lab.webp");
  assert.equal(mediaSource("/Academy_images/IoT%20%26%20Robotics%20Lab.webp"), "/Academy_images/IoT%20%26%20Robotics%20Lab.webp");
  assert.equal(mediaSource("https://example.test/image.jpg"), "https://example.test/image.jpg");
  assert.equal(mediaSource("/100%.jpg"), "/100%25.jpg");
});
