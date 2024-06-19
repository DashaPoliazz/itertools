import { it } from "node:test";
import assert from "assert";
import repeatN from "../lib/producers/repeatN";

it("should produce the same item 'n' times", () => {
  const itemToRepeat = "a";
  const n = 3;
  const result = Array.from(repeatN(itemToRepeat, n));

  assert.deepStrictEqual(result, ["a", "a", "a"]);
});

it("should produce an empty iterable when n is 0", () => {
  const itemToRepeat = "a";
  const n = 0;
  const result = Array.from(repeatN(itemToRepeat, n));

  assert.deepStrictEqual(result, []);
});

it("should handle n being negative by producing an empty iterable", () => {
  const itemToRepeat = "a";
  const n = -1;
  const result = Array.from(repeatN(itemToRepeat, n));

  assert.deepStrictEqual(result, []);
});

it("should work with different types of items", () => {
  const numberToRepeat = 42;
  const n1 = 2;
  const result1 = Array.from(repeatN(numberToRepeat, n1));

  const objectToRepeat = { key: "value" };
  const n2 = 2;
  const result2 = Array.from(repeatN(objectToRepeat, n2));

  assert.deepStrictEqual(result1, [42, 42]);
  assert.deepStrictEqual(result2, [{ key: "value" }, { key: "value" }]);
});
