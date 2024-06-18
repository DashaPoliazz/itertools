import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should take the first n elements from the beginning of the collection when n is positive", () => {
  const collection = [1, 2, 3, 4, 5];
  const out = intoIterable(collection).take(3);
  const result = [...out];
  assert.deepEqual(result, [1, 2, 3]);
});

it("should take the last n elements from the end of the collection when n is negative", () => {
  const collection = [1, 2, 3, 4, 5];
  const out = intoIterable(collection).take(-3);
  const result = [...out];
  assert.deepEqual(result, [3, 4, 5]);
});

it("should return all elements if n is greater than collection length", () => {
  const collection = [1, 2, 3, 4, 5];
  const out1 = intoIterable(collection).take(10);
  const result1 = [...out1];
  assert.deepEqual(result1, [1, 2, 3, 4, 5]);

  const out2 = intoIterable(collection).take(-10);
  const result2 = [...out2];
  assert.deepEqual(result2, [1, 2, 3, 4, 5]);
});

it("should return an empty iterable if n is 0", () => {
  const collection = [1, 2, 3, 4, 5];
  const out1 = intoIterable(collection).take(0);
  const result1 = [...out1];
  assert.deepEqual(result1, []);

  const out2 = intoIterable(collection).take(-0);
  const result2 = [...out2];
  assert.deepEqual(result2, []);
});

it("should return an empty iterable for an empty collection", () => {
  const collection: number[] = [];
  const out1 = intoIterable(collection).take(3);
  const result1 = [...out1];
  assert.deepEqual(result1, []);

  const out2 = intoIterable(collection).take(-3);
  const result2 = [...out2];
  assert.deepEqual(result2, []);
});

it("should handle mixed types in the collection", () => {
  const collection = [1, "2" as any, 3, "four" as any, 5];
  const out1 = intoIterable(collection).take(3);
  const result1 = [...out1];
  assert.deepEqual(result1, [1, "2", 3]);

  const out2 = intoIterable(collection).take(-3);
  const result2 = [...out2];
  assert.deepEqual(result2, [3, "four", 5]);
});
