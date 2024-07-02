import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should peek item with correct n (first element)", () => {
  const collection = [1, 2, 3, 4, 5];
  const nth = intoIterable(collection).nth(0);
  assert.deepStrictEqual([...nth], [1]);
});

it("should peek item with correct n (middle element)", () => {
  const collection = [1, 2, 3, 4, 5];
  const nth = intoIterable(collection).nth(2);
  assert.deepStrictEqual([...nth], [3]);
});

it("should peek item with correct n (last element)", () => {
  const collection = [1, 2, 3, 4, 5];
  const nth = intoIterable(collection).nth(4);
  assert.deepStrictEqual([...nth], [5]);
});

it("should return empty for n out of bounds (negative index)", () => {
  const collection = [1, 2, 3, 4, 5];
  const nth = intoIterable(collection).nth(-1);
  assert.deepStrictEqual([...nth], []);
});

it("should return empty for n out of bounds (index too large)", () => {
  const collection = [1, 2, 3, 4, 5];
  const nth = intoIterable(collection).nth(5);
  assert.deepStrictEqual([...nth], []);
});

it("should return empty for empty collection", () => {
  const collection: number[] = [];
  const nth = intoIterable(collection).nth(0);
  assert.deepStrictEqual([...nth], []);
});
