import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should skip elements from the beginning of the array", () => {
  const collection = [1, 2, 3, 4];
  const out = intoIterable(collection).skipWhile((n) => n <= 2);
  const result = [...out];
  assert.deepEqual(result, [3, 4]);
});

it("should return an empty array if all elements are skipped", () => {
  const collection = [1, 2, 3, 4];
  const out = intoIterable(collection).skipWhile((n) => n < 5); // Always true predicate
  const result = [...out];
  assert.deepEqual(result, []);
});

it("should handle an empty array", () => {
  const collection: number[] = [];
  const out = intoIterable(collection).skipWhile((n) => n < 5); // Always true predicate
  const result = [...out];
  assert.deepEqual(result, []);
});

it("should skip elements with non-numeric values", () => {
  const collection = [1, 2, "3", 4, NaN];
  const out = intoIterable(collection).skipWhile(
    (n) => typeof n === "number" && !isNaN(n),
  );
  const result = [...out];
  assert.deepEqual(result, ["3", 4, NaN]);
});
