import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should work correct", () => {
  const collection = [1, 2, 3, 4, 5];
  const sum = intoIterable(collection).sum();
  assert.deepEqual(sum, 15);
});
