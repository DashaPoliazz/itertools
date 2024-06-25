import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

// Assuming `intoIterable` and `islice` are correctly implemented and exported

it("should slice the iterable correctly", () => {
  const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const iterableWrapper = intoIterable(collection);

  // Test slicing from index 0 to 5
  const sliced = iterableWrapper.islice(0, 5);

  // Test the first 5 values
  assert.deepStrictEqual(sliced.next(), { value: 1, done: false });
  assert.deepStrictEqual(sliced.next(), { value: 2, done: false });
  assert.deepStrictEqual(sliced.next(), { value: 3, done: false });
  assert.deepStrictEqual(sliced.next(), { value: 4, done: false });
  assert.deepStrictEqual(sliced.next(), { value: 5, done: false });

  // After reaching the end of the slice, further calls should return { done: true }
  assert.deepStrictEqual(sliced.next(), { value: undefined, done: true });
});

it("should handle slicing beyond the end of the iterable", () => {
  const collection = [1, 2, 3];
  const iterableWrapper = intoIterable(collection);

  // Test slicing from index 1 to 10 (beyond the end of the iterable)
  const sliced = iterableWrapper.islice(1, 10);

  // Test the remaining 2 values
  assert.deepStrictEqual(sliced.next(), { value: 2, done: false });
  assert.deepStrictEqual(sliced.next(), { value: 3, done: false });

  // After reaching the end of the iterable, further calls should return { done: true }
  assert.deepStrictEqual(sliced.next(), { value: undefined, done: true });
});

it("should handle negative indices correctly", () => {
  const collection = [1, 2, 3];
  const iterableWrapper = intoIterable(collection);

  const sliced = iterableWrapper.islice(-2, -1);
  assert.deepEqual(sliced.next().value, undefined);
});
