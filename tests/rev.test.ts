import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should reverse an array of numbers", () => {
  const collection = [1, 2, 3, 4, 5];
  const out = intoIterable(collection).rev();
  const result = [...out];
  assert.deepEqual(result, [5, 4, 3, 2, 1]);
});

it("should reverse an array of strings", () => {
  const collection = ["apple", "banana", "cherry"];
  const out = intoIterable(collection).rev();
  const result = [...out];
  assert.deepEqual(result, ["cherry", "banana", "apple"]);
});

it("should reverse an array with single element", () => {
  const collection = [42];
  const out = intoIterable(collection).rev();
  const result = [...out];
  assert.deepEqual(result, [42]);
});

it("should reverse an empty array", () => {
  const collection: number[] = [];
  const out = intoIterable(collection).rev();
  const result = [...out];
  assert.deepEqual(result, []);
});

it("should reverse an array with undefined and null values", () => {
  const collection = [null, undefined, 1, 2, 3];
  const out = intoIterable(collection).rev();
  const result = [...out];
  assert.deepEqual(result, [3, 2, 1, undefined, null]);
});
