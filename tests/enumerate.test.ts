import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should enumerate elements correctly", () => {
  const collection = [1, 2, 3, 4, 5];
  const out = intoIterable(collection).enumerate();
  const result = [...out];
  assert.deepEqual(result, [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
  ]);
});

it("should enumerate elements in an empty collection", () => {
  const collection: any[] = [];
  const out = intoIterable(collection).enumerate();
  const result = [...out];
  assert.deepEqual(result, []);
});
