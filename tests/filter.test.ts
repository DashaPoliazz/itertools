import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should work correct", () => {
  const collection = [1, 2, 3, 4, 5];
  const addOne = (x: number) => x + 1;
  const out = intoIterable(collection)
    .filter((x) => x % 2 === 0)
    .filter((x) => x >= 2);
  const result = [...out];
  assert.deepEqual(result, [2, 4]);
});
