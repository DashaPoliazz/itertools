import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should zip all provided iterators correctly", () => {
  const collection = [1, 2, 3, 4, 5];
  const baseIter = intoIterable(collection);
  // other iters
  const otherIter1 = intoIterable(collection).map((x: number) => x + 1);
  const otherIter2 = intoIterable(collection).enumerate();
  const otherIter3 = intoIterable(collection).take(3);

  const iter = baseIter
    .zipAll(otherIter1, otherIter2, otherIter3)
    [Symbol.iterator]();

  assert.deepEqual(iter.next(), { done: false, value: [1, 2, [0, 1], 1] });
  assert.deepEqual(iter.next(), { done: false, value: [2, 3, [1, 2], 2] });
  assert.deepEqual(iter.next(), { done: false, value: [3, 4, [2, 3], 3] });
  assert.deepEqual(iter.next(), { done: true, value: undefined });
});

it("should correctly work with consumed iterator", () => {
  const collection: any[] = [];
  const baseIter = intoIterable(collection);
  // other iters
  const otherIter1 = intoIterable(collection).map((x: number) => x + 1);
  const otherIter2 = intoIterable(collection).enumerate();
  const otherIter3 = intoIterable(collection).take(3);

  const iter = baseIter
    .zipAll(otherIter1, otherIter2, otherIter3)
    [Symbol.iterator]();

  assert.deepEqual(iter.next(), { done: true, value: undefined });
});

it("should correctly work with consumed iterator", () => {
  const collection1 = [1, 2, 3];
  const collection2 = ["foo", "bar"];
  const collection3 = [1n];
  const baseIter = intoIterable(collection1);
  // other iters
  const otherIter1 = intoIterable(collection2).map((s: string) =>
    "$".concat(s),
  );
  const otherIter2 = intoIterable(collection3).enumerate();

  const iter = baseIter.zipAll(otherIter1, otherIter2)[Symbol.iterator]();

  assert.deepEqual(iter.next(), { done: false, value: [1, "$foo", [0, 1n]] });
  assert.deepEqual(iter.next(), { done: true, value: undefined });
});
