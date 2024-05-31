import { myIterator } from "../src/myIterator";
import assert from "node:assert";
import { describe, it } from "node:test";

describe("myIterator", () => {
  it("should yield correct values", () => {
    const result = Array.from(myIterator([1, 2, 3]));
    assert.deepStrictEqual(result, [2, 4, 6]);
  });
});
