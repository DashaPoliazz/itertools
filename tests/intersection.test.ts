import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should find intersections correctly", () => {
  const collection1 = [1, 3, 5, 7, 13];
  const collection2 = [1, 2, 3, 4, 5, 6, 7, 13];

  const iterable = intoIterable(collection1);
  const intersection = iterable.intersection(collection2);

  assert.deepEqual([...intersection], [1, 3, 5, 7, 13]);
});

it("should handle empty collections", () => {
  const collection1: any[] = [];
  const collection2: any[] = [1, 2, 3];

  const iterable = intoIterable(collection1);
  const intersection = iterable.intersection(collection2);

  assert.deepEqual([...intersection], []);
});

it("should handle no intersections", () => {
  const collection1 = [1, 3, 5];
  const collection2 = [2, 4, 6];

  const iterable = intoIterable(collection1);
  const intersection = iterable.intersection(collection2);

  assert.deepEqual([...intersection], []);
});

it("should handle duplicate intersections", () => {
  const collection1 = [1, 2, 2, 3, 3];
  const collection2 = [1, 1, 2, 2, 3, 3];

  const iterable = intoIterable(collection1);
  const intersection = iterable.intersection(collection2);

  assert.deepEqual([...intersection], [1, 2, 3]);
});

it("should handle intersections with different data types", () => {
  const commonRef = { key: "value" };
  const collection1 = [1, "two", true, commonRef];
  const collection2 = ["two", 3, true, commonRef];

  const intersection = intoIterable(collection1).intersection(collection2);

  assert.deepEqual([...intersection], ["two", true, commonRef]);
});

const collection1 = [1, 3, 5, 7];
const collection2 = [1, 2, 3, 4, 5, 6, 7];

const intersections = intoIterable(collection1).intersection(collection2);
