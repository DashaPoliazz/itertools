import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should switch between elements correctly", () => {
  const collection1 = [1, 3, 5];
  const collection2 = [2, 4];
  const iterable = intoIterable(collection1).alternating(collection2);
  assert.deepEqual([...iterable], [1, 2, 3, 4, 5]);
});

it("should handle empty collections", () => {
  const collection1: any[] = [];
  const collection2 = [1, 2, 3];
  const iterable = intoIterable(collection1).alternating(collection2);
  assert.deepEqual([...iterable], [1, 2, 3]);
});

it("should handle empty collections", () => {
  const collection1: any[] = [];
  const collection2 = [1, 2, 3];
  const iterable = intoIterable(collection2).alternating(collection1);
  assert.deepEqual([...iterable], [1, 2, 3]);
});

it("should handle empty collections", () => {
  const collection1: any[] = [];
  const collection2: any[] = [];
  const iterable = intoIterable(collection1).alternating(collection2);
  assert.deepEqual([...iterable], []);
});

it("should handle collections of different lengths", () => {
  const collection1 = [1, 3, 5];
  const collection2 = [2, 4, 6, 8];
  const iterable = intoIterable(collection1).alternating(collection2);
  assert.deepEqual([...iterable], [1, 2, 3, 4, 5, 6, 8]);
});

it("should handle single-element collections", () => {
  const collection1 = [1];
  const collection2 = [2];
  const iterable = intoIterable(collection1).alternating(collection2);
  assert.deepEqual([...iterable], [1, 2]);
});
