import assert from "assert";
import { it } from "node:test";
import empty from "../lib/producers/empty";
import intoIterable from "../lib/intoIter";

it("should return an iterable that yields no items", () => {
  const emptyIterable = empty();
  const iterator = emptyIterable[Symbol.iterator]();

  const firstResult = iterator.next();
  assert.strictEqual(firstResult.done, true);
  assert.strictEqual(firstResult.value, undefined);
});

it("should work with for...of loop", () => {
  const emptyIterable = empty();
  for (const item of emptyIterable) {
    // This block should never be executed
    assert.fail("This block should not be executed");
  }
});

it("should work with the spread operator", () => {
  const emptyIterable = empty();
  const spreadResult = [...emptyIterable];
  assert.deepStrictEqual(spreadResult, []);
});

it("should work with Array.from", () => {
  const emptyIterable = empty();
  const arrayFromResult = Array.from(emptyIterable);
  assert.deepStrictEqual(arrayFromResult, []);
});

it("should allow chaining with intoIterable", () => {
  const emptyIterable = empty<number>();
  const chainedIterable = intoIterable(emptyIterable)
    .map((x: number) => x * 2)
    .filter((x: number) => x > 1);
  const result = Array.from(chainedIterable);
  assert.deepStrictEqual(result, []);
});
