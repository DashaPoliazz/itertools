import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should return the adjacent differences for a collection of positive numbers", () => {
  const collection = [1, 5, 8];
  const iterableWrapper = intoIterable(collection);
  const combination = iterableWrapper.adjacentDifference();

  const iterator = combination[Symbol.iterator]();
  assert.deepStrictEqual(iterator.next(), { done: false, value: 1 });
  assert.deepStrictEqual(iterator.next(), { done: false, value: 4 });
  assert.deepStrictEqual(iterator.next(), { done: false, value: 3 });
  assert.deepStrictEqual(iterator.next(), { done: true, value: undefined });
});

it("should handle an empty collection", () => {
  const collection: number[] = [];
  const iterableWrapper = intoIterable(collection);
  const combination = iterableWrapper.adjacentDifference();

  const iterator = combination[Symbol.iterator]();
  assert.deepStrictEqual(iterator.next(), { done: true, value: undefined });
});

it("should handle a collection with one element", () => {
  const collection = [42];
  const iterableWrapper = intoIterable(collection);
  const combination = iterableWrapper.adjacentDifference();

  const iterator = combination[Symbol.iterator]();
  assert.deepStrictEqual(iterator.next(), { done: false, value: 42 });
  assert.deepStrictEqual(iterator.next(), { done: true, value: undefined });
});

it("should handle a collection with negative numbers", () => {
  const collection = [-2, -5, -9];
  const iterableWrapper = intoIterable(collection);
  const combination = iterableWrapper.adjacentDifference();

  const iterator = combination[Symbol.iterator]();
  assert.deepStrictEqual(iterator.next(), { done: false, value: -2 });
  assert.deepStrictEqual(iterator.next(), { done: false, value: -3 });
  assert.deepStrictEqual(iterator.next(), { done: false, value: -4 });
  assert.deepStrictEqual(iterator.next(), { done: true, value: undefined });
});

it("should handle a collection with mixed positive and negative numbers", () => {
  const collection = [3, -1, 4, -2];
  const iterableWrapper = intoIterable(collection);
  const combination = iterableWrapper.adjacentDifference();

  const iterator = combination[Symbol.iterator]();
  assert.deepStrictEqual(iterator.next(), { done: false, value: 3 });
  assert.deepStrictEqual(iterator.next(), { done: false, value: -4 });
  assert.deepStrictEqual(iterator.next(), { done: false, value: 5 });
  assert.deepStrictEqual(iterator.next(), { done: false, value: -6 });
  assert.deepStrictEqual(iterator.next(), { done: true, value: undefined });
});
