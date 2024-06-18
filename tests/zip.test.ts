import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should zip iterables correctly", () => {
  const collection = [1, 2, 3, 4, 5];

  // Create an IterableWrapper for the original collection
  const iterable = intoIterable(collection);

  // Apply map and enumerate operations
  const mappedIterable = iterable.map((x) => x + 1);
  const enumeratedIterable = intoIterable(collection).enumerate();

  // Zip the mapped and enumerated iterables
  const zippedIterable = mappedIterable.zip(enumeratedIterable);

  // Convert to iterator and check each result
  const iterator = zippedIterable[Symbol.iterator]();

  assert.deepEqual(iterator.next(), { done: false, value: [2, [0, 1]] });
  assert.deepEqual(iterator.next(), { done: false, value: [3, [1, 2]] });
  assert.deepEqual(iterator.next(), { done: false, value: [4, [2, 3]] });
  assert.deepEqual(iterator.next(), { done: false, value: [5, [3, 4]] });
  assert.deepEqual(iterator.next(), { done: false, value: [6, [4, 5]] });
  assert.deepEqual(iterator.next(), { done: true, value: undefined });
});

it("should stop it's work if one of the iterators has been consumed", () => {
  const collection1 = [1, 2, 3, 4, 5];
  const collection2 = ["foo1", "foo2"];

  // Create an IterableWrapper for the original collection
  const iterable = intoIterable(collection1);

  // Apply map and enumerate operations
  const mappedIterable = iterable.map((x) => x + 1);
  const enumeratedIterable = intoIterable(collection2).enumerate();

  // Zip the mapped and enumerated iterables
  const zippedIterable = mappedIterable.zip(enumeratedIterable);

  // Convert to iterator and check each result
  const iterator = zippedIterable[Symbol.iterator]();

  assert.deepEqual(iterator.next(), { done: false, value: [2, [0, "foo1"]] });
  assert.deepEqual(iterator.next(), { done: false, value: [3, [1, "foo2"]] });
  assert.deepEqual(iterator.next(), { done: true, value: undefined });
});
