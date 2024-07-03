import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should return min element", () => {
  const collection = [1, 2, 3, 4, 5];
  const min = intoIterable(collection).min();
  assert.equal(min, 1);
});

it("should return min element for negative numbers", () => {
  const collection = [-1, -2, -3, -4, -5];
  const min = intoIterable(collection).min();
  assert.equal(min, -5);
});

it("should return Infinity for empty collection in min method", () => {
  const collection: any[] = [];
  const min = intoIterable(collection).min();
  assert.equal(min, Infinity);
});
