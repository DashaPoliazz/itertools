import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should return true if every element satisfies predicate", () => {
  const collection = [1, 2, 3, 4, 5];
  const isGreaterThanZero = (item: number) => item > 0;

  const result = intoIterable(collection).every(isGreaterThanZero);

  assert.strictEqual(result, true);
});

it("should return false if any element does not satisfy predicate", () => {
  const collection = [1, 2, 3, 4, 5];
  const isEven = (item: number) => item % 2 === 0;

  const result = intoIterable(collection).every(isEven);

  assert.strictEqual(result, false);
});

it("should return true for an empty collection", () => {
  const collection: number[] = [];
  const isGreaterThanZero = (item: number) => item > 0;

  const result = intoIterable(collection).every(isGreaterThanZero);

  assert.strictEqual(result, true);
});
