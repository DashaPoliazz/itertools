import { it } from "node:test";
import assert from "node:assert";
import permutations from "../lib/producers/permutations";

it("should generate k combinations from numeric array", () => {
  const collection = [1, 2, 3, 4];
  const k = 2;
  const expected = [
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
    [3, 4],
  ];

  const iter = permutations(collection, k);
  const actual: number[][] = Array.from(iter);

  assert.deepStrictEqual(actual, expected);
});

it("should generate k combinations from empty array", () => {
  const collection: number[] = [];
  const k = 2;
  const expected: number[][] = [];

  const iter = permutations(collection, k);
  const actual: number[][] = Array.from(iter);

  assert.deepStrictEqual(actual, expected);
});

it("should generate k combinations from string array", () => {
  const collection = ["a", "b", "c", "d"];
  const k = 3;
  const expected = [
    ["a", "b", "c"],
    ["a", "b", "d"],
    ["a", "c", "d"],
    ["b", "c", "d"],
  ];

  const iter = permutations(collection, k);
  const actual: string[][] = Array.from(iter);

  assert.deepStrictEqual(actual, expected);
});
