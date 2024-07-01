import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should create union correctly when both collections are distinct", () => {
  const collection1 = [1, 2, 3];
  const collection2 = [4, 5, 6];

  const union = intoIterable(collection1).union(collection2);

  assert.deepEqual([...union], [1, 2, 3, 4, 5, 6]);
});

it("should handle empty collections", () => {
  const collection1: any[] = [];
  const collection2 = [1, 2, 3];

  const union = intoIterable(collection1).union(collection2);

  assert.deepEqual([...union], [1, 2, 3]);
});

it("should handle collections with duplicates", () => {
  const collection1 = [1, 2, 2, 3];
  const collection2 = [2, 3, 3, 4];

  const union = intoIterable(collection1).union(collection2);

  assert.deepEqual([...union], [1, 2, 3, 4]);
});

it("should handle collections with objects (reference comparison)", () => {
  const obj1 = { id: 1 };
  const obj2 = { id: 2 };
  const collection1 = [obj1, obj2];
  const collection2 = [{ id: 1 }, obj2];

  const union = intoIterable(collection1).union(collection2);

  assert.deepEqual([...union], [obj1, obj2, { id: 1 }]);
});

it("should handle large collections efficiently", () => {
  const collection1 = Array.from({ length: 10000 }, (_, index) => index);
  const collection2 = Array.from({ length: 5000 }, (_, index) => index + 10000);

  const union = intoIterable(collection1).union(collection2);

  assert.strictEqual([...union].length, 10000 + 5000);
});
