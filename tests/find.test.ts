import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should return first element from the collection which satisfies predicate", () => {
  const collection = [1, 2, 3, 4, 5];
  const five = (item: number) => item === 5;

  const result = intoIterable(collection).find(five);

  assert.deepEqual([...result], [5]);
});

it("should return undefined if no element satisfies the predicate", () => {
  const collection = [1, 2, 3, 4, 5];
  const greaterThanTen = (item: number) => item > 10;

  const result = intoIterable(collection).find(greaterThanTen);

  assert.strictEqual([...result][0], undefined);
});

it("should handle an empty collection", () => {
  const collection: number[] = [];
  const anyPredicate = (item: number) => true;

  const result = intoIterable(collection).find(anyPredicate);
  assert.strictEqual([...result].length, 0);
});
