import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should yield every nth element", () => {
  const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const step = 2;
  const evens = intoIterable(collection).stepBy(step);
  assert.deepEqual([...evens], [1, 3, 5, 7, 9]);
});

it("should yield the first element if step is larger than collection length", () => {
  const collection = [1, 2, 3];
  const step = 5;
  const result = intoIterable(collection).stepBy(step);
  assert.deepEqual([...result], [1]);
});

it("should yield all elements if step is 1", () => {
  const collection = [1, 2, 3, 4, 5];
  const step = 1;
  const result = intoIterable(collection).stepBy(step);
  assert.deepEqual([...result], [1, 2, 3, 4, 5]);
});

it("should return an empty array if the collection is empty", () => {
  const collection: any = [];
  const step = 2;
  const result = intoIterable(collection).stepBy(step);
  assert.deepEqual([...result], []);
});

it("should work with different types of collections", () => {
  const collection = ["a", "b", "c", "d", "e", "f"];
  const step = 3;
  const result = intoIterable(collection).stepBy(step);
  assert.deepEqual([...result], ["a", "d"]);
});

it("should handle collections with only one element", () => {
  const collection = [42];
  const step = 3;
  const result = intoIterable(collection).stepBy(step);
  assert.deepEqual([...result], [42]);
});

it("should handle a step size of 0 by returning the first element", () => {
  const collection = [1, 2, 3, 4, 5];
  const step = 0;
  const result = intoIterable(collection).stepBy(step);
  assert.deepEqual([...result], [1, 2, 3, 4, 5]);
});

it("should handle negative step size by treating it as 1", () => {
  const collection = [1, 2, 3, 4, 5];
  const step = -2;
  const result = intoIterable(collection).stepBy(step);
  assert.deepEqual([...result], [1, 2, 3, 4, 5]);
});
