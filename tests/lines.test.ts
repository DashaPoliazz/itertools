import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should delimit lines correctly", () => {
  const text = "hello\nworld!\n";
  const iterable = intoIterable(text).lines();
  const result = [...iterable];
  assert.deepEqual(result, ["hello", "world!"]);
});

it("should handle empty input", () => {
  const text = "";
  const iterable = intoIterable(text).lines();
  const result = [...iterable];
  assert.deepEqual(result, []);
});

it("should handle mixed line endings (CRLF)", () => {
  const text = "line1\r\nline2\r\nline3\r\n";
  const iterable = intoIterable(text).lines("\r\n");
  const result = [...iterable];
  assert.deepEqual(result, ["line1", "line2", "line3"]);
});

it("should handle mixed line endings (CR)", () => {
  const text = "line1\rline2\rline3\r";
  const iterable = intoIterable(text).lines("\r");
  const result = [...iterable];
  assert.deepEqual(result, ["line1", "line2", "line3"]);
});

it("should trim whitespace from lines", () => {
  const text = "  line1  \n  line2  \n  ";
  const iterable = intoIterable(text).lines();
  const result = [...iterable];
  assert.deepEqual(result, ["line1", "line2"]);
});

it("should handle multi-line text with no trailing newline", () => {
  const text = "line1\nline2";
  const iterable = intoIterable(text).lines();
  const result = [...iterable];
  assert.deepEqual(result, ["line1", "line2"]);
});
