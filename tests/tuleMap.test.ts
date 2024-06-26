import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

describe("tupleMap tests", () => {
  it("should correctly map elements", () => {
    const collection = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    // Function to add one to each element of a tuple
    const addOne = (tuple: [number, number]): [number, number] => [
      tuple[0] + 1,
      tuple[1] + 1,
    ];

    // Use tupleMap to apply addOne function to each tuple
    const out = intoIterable(collection).tupleMap(addOne);

    // Convert result into an array for assertion
    const result = [...out];

    assert.deepStrictEqual(result, [
      [2, 3],
      [4, 5],
      [6, 7],
    ]);
  });

  it("should handle empty collections", () => {
    const collection: [number, number][] = [];

    const addOne = (tuple: [number, number]): [number, number] => [
      tuple[0] + 1,
      tuple[1] + 1,
    ];

    const out = intoIterable(collection).tupleMap(addOne);
    const result = [...out];

    assert.deepStrictEqual(result, []);
  });

  it("should handle single-element collections", () => {
    const collection = [[1, 1]];

    const addOne = (tuple: [number, number]): [number, number] => [
      tuple[0] + 1,
      tuple[1] + 1,
    ];

    const out = intoIterable(collection).tupleMap(addOne);
    const result = [...out];

    assert.deepStrictEqual(result, [[2, 2]]);
  });

  it("should handle negative numbers", () => {
    const collection = [
      [-1, -2],
      [-3, -4],
    ];

    const addOne = (tuple: [number, number]): [number, number] => [
      tuple[0] + 1,
      tuple[1] + 1,
    ];

    const out = intoIterable(collection).tupleMap(addOne);
    const result = [...out];

    assert.deepStrictEqual(result, [
      [0, -1],
      [-2, -3],
    ]);
  });

  it("should not mutate the original collection", () => {
    const collection = [
      [1, 2],
      [3, 4],
    ];

    const addOne = (tuple: [number, number]): [number, number] => [
      tuple[0] + 1,
      tuple[1] + 1,
    ];

    const originalCollection = [...collection]; // Make a copy of the original collection
    const out = intoIterable(collection).tupleMap(addOne);
    [...out]; // Evaluate the iterator

    assert.deepStrictEqual(collection, originalCollection); // Ensure the original collection is unchanged
  });

  it("should handle custom mapping functions", () => {
    const collection = [
      [2, 3],
      [4, 5],
    ];

    const customMap = (tuple: [number, number]): [number, number] => [
      tuple[0] * 2,
      tuple[1] * 3,
    ];

    const out = intoIterable(collection).tupleMap(customMap);
    const result = [...out];

    assert.deepStrictEqual(result, [
      [4, 9],
      [8, 15],
    ]);
  });
});
