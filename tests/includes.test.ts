import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should return true if element is in collection", () => {
  const collection = [1, 2, 3, 4, 5];
  const inCollection = intoIterable(collection).includes((n) => n === 2);
  assert.equal(inCollection, true);
});

it("should return false if element is not in collection", () => {
  const collection = [1, 2, 3, 4, 5];
  const inCollection = intoIterable(collection).includes((n) => n === 6);
  assert.equal(inCollection, false);
});

it("should return true for first matching element", () => {
  const collection = [1, 2, 3, 4, 5];
  const inCollection = intoIterable(collection).includes((n) => n < 3);
  assert.equal(inCollection, true);
});

it("should return false for empty collection", () => {
  const collection: any[] = [];
  const inCollection = intoIterable(collection).includes((n) => n === 1);
  assert.equal(inCollection, false);
});
