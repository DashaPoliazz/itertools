import assert from "assert";
import { it } from "node:test";
import once from "../lib/producers/once";
import intoIterable from "../lib/intoIter";

it("should yield the value once and then be done", () => {
  const iterable = once("Hello");
  const iterator = iterable[Symbol.iterator]();

  const firstResult = iterator.next();
  assert.strictEqual(firstResult.done, false);
  assert.strictEqual(firstResult.value, "Hello");

  const secondResult = iterator.next();
  assert.strictEqual(secondResult.done, true);
  assert.strictEqual(secondResult.value, undefined);
});

it("should work with for...of loop", () => {
  const iterable = once(42);
  for (const item of iterable) {
    assert.strictEqual(item, 42);
  }
});

it("should work with the spread operator", () => {
  const iterable = once(true);
  const spreadResult = [...iterable];
  assert.deepStrictEqual(spreadResult, [true]);
});

it("should work with Array.from", () => {
  const iterable = once({ key: "value" });
  const arrayFromResult = Array.from(iterable);
  assert.deepStrictEqual(arrayFromResult, [{ key: "value" }]);
});

it("should allow chaining with intoIterable", () => {
  const iterable = once(3);
  const doubled = intoIterable(iterable)
    .map((x) => x * 2)
    .filter((x) => x > 5);

  const result = Array.from(doubled);
  assert.deepStrictEqual(result, [6]);
});
