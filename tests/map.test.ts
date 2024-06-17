import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should work correct", () => {
  const collection = [1, 2, 3, 4, 5];
  const addOne = (x: number) => x + 1;
  const out = intoIterable(collection)
    .map(addOne)
    .map(addOne)
    .map(addOne)
    .map(addOne)
    .map(addOne);
  const result = [...out];
  assert.deepEqual(result, [6, 7, 8, 9, 10]);
});
