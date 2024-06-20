import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should filter even numbers and add one", () => {
  const collection = [1, 2, 3, 4, 5];
  const iterable = intoIterable(collection);

  const even = (x: number) => x % 2 === 0;
  const addOne = (x: number) => x + 1;

  const result = iterable.filterMap(even, addOne);
  assert.deepEqual([...result], [3, 5]);
});

it("should filter odd numbers and square them", () => {
  const collection = [1, 2, 3, 4, 5];
  const iterable = intoIterable(collection);

  const odd = (x: number) => x % 2 !== 0;
  const square = (x: number) => x * x;

  const result = iterable.filterMap(odd, square);
  assert.deepEqual([...result], [1, 9, 25]);
});

it("should filter strings containing 'a' and convert to uppercase", () => {
  const collection = ["apple", "banana", "cherry", "date"];
  const iterable = intoIterable(collection);

  const containsA = (x: string) => x.includes("a");
  const toUpperCase = (x: string) => x.toUpperCase();

  const result = iterable.filterMap(containsA, toUpperCase);
  assert.deepEqual([...result], ["APPLE", "BANANA", "DATE"]);
});

it("should return an empty iterable when the collection is empty", () => {
  const collection: number[] = [];
  const iterable = intoIterable(collection);

  const even = (x: number) => x % 2 === 0;
  const addOne = (x: number) => x + 1;

  const result = iterable.filterMap(even, addOne);
  assert.deepEqual([...result], []);
});

it("should return an empty iterable when no elements match the predicate", () => {
  const collection = [1, 2, 3, 4, 5];
  const iterable = intoIterable(collection);

  const greaterThanTen = (x: number) => x > 10;
  const addOne = (x: number) => x + 1;

  const result = iterable.filterMap(greaterThanTen, addOne);
  assert.deepEqual([...result], []);
});

it("should filter objects based on a property and return the property value", () => {
  const collection = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];
  const iterable = intoIterable(collection);

  const hasEvenId = (obj: { id: number; name: string }) => obj.id % 2 === 0;
  const getName = (obj: { id: number; name: string }) => obj.name;

  const result = iterable.filterMap(hasEvenId, getName);
  assert.deepEqual([...result], ["Bob"]);
});

it("should handle null and undefined values gracefully", () => {
  const collection = [null, undefined, 0, false, "", NaN];
  const iterable = intoIterable(collection);

  const isFalsy = (x: any) => !x;
  const toString = (x: any) => String(x);

  const result = iterable.filterMap(isFalsy, toString);
  assert.deepEqual([...result], ["null", "undefined", "0", "false", "", "NaN"]);
});
