import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should correctly map elements", () => {
  const collection = [1, 2, 3, 4, 5];
  const addOne = (x: number) => x + 1;
  const out = intoIterable(collection).map(addOne);
  const result = [...out];
  assert.deepEqual(result, [2, 3, 4, 5, 6]);
});

it("should handle an empty collection", () => {
  const collection: number[] = [];
  const addOne = (x: number) => x + 1;
  const out = intoIterable(collection).map(addOne);
  const result = [...out];
  assert.deepEqual(result, []);
});

it("should work with different types", () => {
  const collection = [1, 2, 3, 4, 5];
  const toString = (x: number) => `Number: ${x}`;
  const out = intoIterable(collection).map(toString);
  const result = [...out];
  assert.deepEqual(result, [
    "Number: 1",
    "Number: 2",
    "Number: 3",
    "Number: 4",
    "Number: 5",
  ]);
});

it("should allow chaining of map functions", () => {
  const collection = [1, 2, 3, 4, 5];
  const addOne = (x: number) => x + 1;
  const multiplyByTwo = (x: number) => x * 2;
  const out = intoIterable(collection).map(addOne).map(multiplyByTwo);
  const result = [...out];
  assert.deepEqual(result, [4, 6, 8, 10, 12]);
});

it("should work correctly with .next()", () => {
  const collection = [1, 2, 3, 4, 5];
  const addOne = (x: number) => x + 1;
  const iterable = intoIterable(collection).map(addOne);

  // Iterate using next()
  const iterator = iterable[Symbol.iterator]();
  assert.deepEqual(iterator.next().value, 2);
  assert.deepEqual(iterator.next().value, 3);
  assert.deepEqual(iterator.next().value, 4);
  assert.deepEqual(iterator.next().value, 5);
  assert.deepEqual(iterator.next().value, 6);
  assert.deepEqual(iterator.next().done, true);
});
