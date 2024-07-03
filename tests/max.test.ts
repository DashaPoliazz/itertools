import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should return max element", () => {
  const collection = [1, 2, 3, 4, 5];
  const max = intoIterable(collection).max();
  assert.equal(max, 5);
});

it("should return max element for negative numbers", () => {
  const collection = [-1, -2, -3, -4, -5];
  const max = intoIterable(collection).max();
  assert.equal(max, -1);
});

it("should return -Infinity for empty collection in max method", () => {
  const collection: any[] = [];
  const max = intoIterable(collection).max();
  assert.equal(max, -Infinity);
});
