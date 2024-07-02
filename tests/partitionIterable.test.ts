import assert from "assert";
import { it } from "node:test";
import intoIterable from "../lib/intoIter";

it("should partition collection correctly", () => {
  const collection = [1, 2, 3];
  const [evens, odds] = intoIterable(collection).partition((n) => n % 2 == 0);
  assert.deepEqual(evens, [2]);
  assert.deepEqual(odds, [1, 3]);
});

it("should handle empty collection", () => {
  const collection: any[] = [];
  const [evens, odds] = intoIterable(collection).partition((n) => n % 2 === 0);
  assert.deepEqual(evens, []);
  assert.deepEqual(odds, []);
});

it("should handle collection with all even numbers", () => {
  const collection = [2, 4, 6];
  const [evens, odds] = intoIterable(collection).partition((n) => n % 2 === 0);
  assert.deepEqual(evens, [2, 4, 6]);
  assert.deepEqual(odds, []);
});

it("should handle collection with all odd numbers", () => {
  const collection = [1, 3, 5];
  const [evens, odds] = intoIterable(collection).partition((n) => n % 2 === 0);
  assert.deepEqual(evens, []);
  assert.deepEqual(odds, [1, 3, 5]);
});

it("should partition based on negative numbers", () => {
  const collection = [-2, -1, 0, 1, 2];
  const [negatives, nonNegatives] = intoIterable(collection).partition(
    (n) => n < 0,
  );
  assert.deepEqual(negatives, [-2, -1]);
  assert.deepEqual(nonNegatives, [0, 1, 2]);
});

it("should partition based on string lengths", () => {
  const collection = ["appl", "banana", "kiwi", "orange"];
  const [shortWords, longWords] = intoIterable(collection).partition(
    (word) => word.length <= 4,
  );
  assert.deepEqual(shortWords, ["appl", "kiwi"]);
  assert.deepEqual(longWords, ["banana", "orange"]);
});
