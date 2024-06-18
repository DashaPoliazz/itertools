import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should count elements in a non-empty array", () => {
  const collection = [1, 2, 3, 4, 5];
  const count = intoIterable(collection).count();
  assert.deepEqual(count, 5);
});

it("should count elements in an empty array", () => {
  const collection: any[] = [];
  const count = intoIterable(collection).count();
  assert.deepEqual(count, 0);
});

it("should count elements in a Set", () => {
  const collection = new Set([1, 2, 3, 4, 5]);
  const count = intoIterable(collection).count();
  assert.deepEqual(count, 5);
});

it("should count elements in a Map", () => {
  const collection = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ]);
  const count = intoIterable(collection).count();
  assert.deepEqual(count, 3);
});

it("should count elements in a string", () => {
  const collection = "hello";
  const count = intoIterable(collection).count();
  assert.deepEqual(count, 5);
});
