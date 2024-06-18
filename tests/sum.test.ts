import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should calculate sum of numbers in a basic collection", () => {
  const collection = [1, 2, 3, 4, 5];
  const sum = intoIterable(collection).sum();
  assert.strictEqual(sum, 15);
});

it("should return 0 for an empty collection", () => {
  const collection: number[] = [];
  const sum = intoIterable(collection).sum();
  assert.strictEqual(sum, 0);
});

it("should handle negative numbers correctly", () => {
  const collection = [-1, -2, -3, -4, -5];
  const sum = intoIterable(collection).sum();
  assert.strictEqual(sum, -15);
});

it("should calculate sum of floating point numbers", () => {
  const collection = [1.1, 2.2, 3.3, 4.4, 5.5];
  const sum = intoIterable(collection).sum();
  assert.strictEqual(sum, 16.5);
});

it("should handle large numbers without overflow", () => {
  const collection = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
  const sum = intoIterable(collection).sum();
  assert.strictEqual(sum, 2 * Number.MAX_SAFE_INTEGER);
});

it("should handle NaN and Infinity gracefully", () => {
  const collection = [1, NaN, 3, Infinity, 5];
  const sum = intoIterable(collection).sum();
  assert.strictEqual(sum, NaN);
});

it("should correctly sum complex objects based on a numeric property", () => {
  const collection = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ];
  const sum = intoIterable(collection)
    .map((obj) => obj.value)
    .sum();

  assert.equal(sum, 15);
});
