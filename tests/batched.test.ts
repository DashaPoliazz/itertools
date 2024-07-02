import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should batch collection correctly", () => {
  const collection = [1, 2, 3, 4, 5, 6];
  const batched = intoIterable(collection).batched(2);
  assert.deepStrictEqual(
    [...batched],
    [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
  );
});

it("should handle batch size larger than collection size", () => {
  const collection = [1, 2, 3];
  const batched = intoIterable(collection).batched(5);
  assert.deepStrictEqual([...batched], [[1, 2, 3]]);
});

it("should handle batch size of 1", () => {
  const collection = [1, 2, 3];
  const batched = intoIterable(collection).batched(1);
  assert.deepStrictEqual([...batched], [[1], [2], [3]]);
});

it("should handle empty collection", () => {
  const collection: number[] = [];
  const batched = intoIterable(collection).batched(2);
  assert.deepStrictEqual([...batched], []);
});

it("should handle batch size equal to collection size", () => {
  const collection = [1, 2, 3];
  const batched = intoIterable(collection).batched(3);
  assert.deepStrictEqual([...batched], [[1, 2, 3]]);
});
