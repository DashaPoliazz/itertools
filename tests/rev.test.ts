import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should work correct", () => {
  const collection = [1, 2, 3, 4, 5];
  const out = intoIterable(collection).rev();
  const result = [...out];
  assert.deepEqual(result, [5, 4, 3, 2, 1]);
});