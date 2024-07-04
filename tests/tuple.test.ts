import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should slice collection into tuples correctly", () => {
  const collection = [1, 2, 3, 4];
  const tuples = intoIterable(collection).tuples();

  assert.deepEqual(
    [...tuples],
    [
      [1, 2],
      [3, 4],
    ],
  );
});

it("should handle odd number of elements by omitting the last single element", () => {
  const collection = [1, 2, 3, 4, 5];
  const tuples = intoIterable(collection).tuples();

  assert.deepEqual(
    [...tuples],
    [
      [1, 2],
      [3, 4],
    ],
  );
});

it("should return an empty array for an empty collection", () => {
  const collection: number[] = [];
  const tuples = intoIterable(collection).tuples();

  assert.deepEqual([...tuples], []);
});

it("should return a single tuple for a collection with exactly two elements", () => {
  const collection = [1, 2];
  const tuples = intoIterable(collection).tuples();

  assert.deepEqual([...tuples], [[1, 2]]);
});

it("should return no tuples for a collection with a single element", () => {
  const collection = [1];
  const tuples = intoIterable(collection).tuples();

  assert.deepEqual([...tuples], []);
});

it("should return a single tuple for a collection with exactly two elements", () => {
  const collection = [1, 2];
  const tuples = intoIterable(collection)
    .tuples()
    .tupleMap(([a, b]) => [a + 1, b + 1]);

  assert.deepEqual([...tuples], [[2, 3]]);
});
