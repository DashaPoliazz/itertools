import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should skip elements from the beginning of the array", () => {
  const collection = [1, 2, 3, 4, 5];
  const out = intoIterable(collection).skip(3);
  const result = [...out];
  assert.deepEqual(result, [4, 5]);
});

it("should return an empty array if skip count is greater than or equal to array length", () => {
  const collection = [1, 2, 3];
  const out1 = intoIterable(collection).skip(3);
  const result1 = [...out1];
  assert.deepEqual(result1, []);

  const out2 = intoIterable(collection).skip(5);
  const result2 = [...out2];
  assert.deepEqual(result2, []);
});

it("should return the entire array if skip count is 0", () => {
  const collection = [1, 2, 3];
  const out = intoIterable(collection).skip(0);
  const result = [...out];
  assert.deepEqual(result, [1, 2, 3]);
});

it("should handle empty arrays gracefully", () => {
  const collection: number[] = [];
  const out = intoIterable(collection).skip(2);
  const result = [...out];
  assert.deepEqual(result, []);
});

it("should handle negative skip count by returning the entire array", () => {
  const collection = [1, 2, 3];
  const out = intoIterable(collection).skip(-2);
  const result = [...out];
  assert.deepEqual(result, [1, 2, 3]);
});
