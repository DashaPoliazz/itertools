import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should handle plain collection correctly", () => {
  const collection = [1, 2, 3];
  const result = intoIterable(collection).flat();
  assert.deepEqual([...result], [1, 2, 3]);
});

it("should plain 1-level nested collection correctly", () => {
  const collection = [[1], 2, 3];
  const result = intoIterable(collection).flat();
  assert.deepEqual([...result], [1, 2, 3]);
});

it("should handle n-nested collection correctly 1", () => {
  const collection = [[[[[1]]]], 2, 3];
  const result = intoIterable(collection).flat();
  assert.deepEqual([...result], [1, 2, 3]);
});

it("should handle n-nested collection correctly 2", () => {
  const collection = [[[[[[1]]]], [2], [3, [4, [5, 6]]]]];
  const result = intoIterable(collection).flat();
  assert.deepEqual([...result], [1, 2, 3, 4, 5, 6]);
});
