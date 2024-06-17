import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should work correct", () => {
  const collection = [1, 2, 3, 4, 5];
  const count = intoIterable(collection).count();
  assert.deepEqual(count, 5);
});
