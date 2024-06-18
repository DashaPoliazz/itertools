import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should apply forEach correctly", () => {
  const collection = [1, 2, 3, 4, 5];
  const result: number[] = [];
  [
    ...intoIterable(collection).forEach((x) => {
      result.push(x);
    }),
  ];
  assert.deepEqual(result, [1, 2, 3, 4, 5]);
});

it("should handle forEach on an empty collection", () => {
  const collection: number[] = [];
  const result: number[] = [];

  intoIterable(collection)
    .forEach((x) => {
      console.log(x);
      result.push(x);
    })
    .next();
  assert.deepEqual(result, []);
});
