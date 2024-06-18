import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should filter elements correctly", () => {
  const collection = [1, 2, 3, 4, 5];
  const out = intoIterable(collection)
    .filter((x) => x % 2 === 0)
    .filter((x) => x >= 2);
  const result = [...out];
  assert.deepEqual(result, [2, 4]);
});

it("should filter elements with no matches", () => {
  const collection = [1, 2, 3, 4, 5];
  const out = intoIterable(collection).filter((x) => x > 10);
  const result = [...out];
  assert.deepEqual(result, []);
});
