import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

describe("createUniqueIterable", () => {
  it("should yield only unique values", () => {
    const collection = [1, 2, 3, 1, 2, 3, 1, 2, 3];
    const iterable = intoIterable(collection).unique();

    assert.strictEqual(iterable.next().value, 1);
    assert.strictEqual(iterable.next().value, 2);
    assert.strictEqual(iterable.next().value, 3);
    assert.strictEqual(iterable.next().done, true);
  });

  it("should handle an iterator with no duplicates", () => {
    const collection = [1, 2, 3, 4, 5];
    const iterable = intoIterable(collection).unique();

    assert.strictEqual(iterable.next().value, 1);
    assert.strictEqual(iterable.next().value, 2);
    assert.strictEqual(iterable.next().value, 3);
    assert.strictEqual(iterable.next().value, 4);
    assert.strictEqual(iterable.next().value, 5);
    assert.strictEqual(iterable.next().done, true);
  });

  it("should handle an iterator with all duplicates", () => {
    const collection = [1, 1, 1, 1, 1];
    const iterable = intoIterable(collection).unique();

    assert.strictEqual(iterable.next().value, 1);
    assert.strictEqual(iterable.next().done, true);
  });

  it("should handle an empty iterator", () => {
    const collection: number[] = [];
    const iterable = intoIterable(collection).unique();

    assert.strictEqual(iterable.next().done, true);
  });

  it("should handle non-primitive values", () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 2 };
    const obj3 = { a: 1 };
    const collection = [obj1, obj2, obj3];
    const iterable = intoIterable(collection).unique();

    assert.strictEqual(iterable.next().value, obj1);
    assert.strictEqual(iterable.next().value, obj2);
    assert.strictEqual(iterable.next().value, obj3);
    assert.strictEqual(iterable.next().done, true);
  });
});
