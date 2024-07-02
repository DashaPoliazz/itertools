import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should define all diffs correctly for non-overlapping collections", () => {
  const collection1 = [1, 2, 3];
  const collection2 = [4, 5, 6];
  const diff = intoIterable(collection1).symmetricDifference(collection2);
  assert.deepStrictEqual([...diff], [1, 2, 3, 4, 5, 6]);
});

it("should define all diffs correctly for overlapping collections", () => {
  const collection1 = [1, 2, 3];
  const collection2 = [2, 3, 4];
  const diff = intoIterable(collection1).symmetricDifference(collection2);
  assert.deepStrictEqual([...diff], [1, 4]);
});

it("should define all diffs correctly for identical collections", () => {
  const collection1 = [1, 2, 3];
  const collection2 = [1, 2, 3];
  const diff = intoIterable(collection1).symmetricDifference(collection2);
  assert.deepStrictEqual([...diff], []);
});

it("should define all diffs correctly for empty collections", () => {
  const collection1: number[] = [];
  const collection2: number[] = [];
  const diff = intoIterable(collection1).symmetricDifference(collection2);
  assert.deepStrictEqual([...diff], []);
});

it("should define all diffs correctly when one collection is empty", () => {
  const collection1 = [1, 2, 3];
  const collection2: number[] = [];
  const diff = intoIterable(collection1).symmetricDifference(collection2);
  assert.deepStrictEqual([...diff], [1, 2, 3]);
});
