import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should yield last element if it exists", () => {
  const collection = [1, 2, 3, 4];
  const lastElement = intoIterable(collection).last();
  assert.equal(lastElement, 4);
});

it("should return null for an empty iterable", () => {
  const collection: any = [];
  const lastElement = intoIterable(collection).last();
  assert.equal(lastElement, null);
});

it("should handle single-element iterable", () => {
  const collection = [42];
  const lastElement = intoIterable(collection).last();
  assert.equal(lastElement, 42);
});

it("should handle large iterables", () => {
  const collection = Array.from({ length: 10000 }, (_, i) => i + 1);
  const lastElement = intoIterable(collection).last();
  assert.equal(lastElement, 10000);
});
