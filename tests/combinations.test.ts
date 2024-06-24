import { it } from "node:test";
import assert from "assert";
import combinations from "../lib/producers/combinations";

it("return all possible combination from the collection", () => {
  const collection = [1, 2, 3];
  const combination = combinations(collection, 2);
  assert.deepEqual(
    [...combination],
    [
      [3, 2],
      [3, 1],
      [2, 3],
      [2, 1],
      [1, 3],
      [1, 2],
    ],
  );
});

it("should work correctly with empty collection", () => {
  const collection: any[] = [];
  const combination = combinations(collection, 2);
  assert.deepEqual([...combination], []);
});

it("should return all possible combination with k = 1", () => {
  const collection = [1, 2, 3];
  const combination = combinations(collection, 1);
  assert.deepEqual([...combination], [[3], [2], [1]]);
});

it("should return consumed iterator if k > collection.length", () => {
  const collection = [1, 2, 3];
  const combination = combinations(collection, 5);
  assert.deepEqual([...combination], []);
});
