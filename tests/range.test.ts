import { it, describe } from "node:test";
import assert from "assert";
import range from "../lib/producers/range";

describe("number", () => {
  it("should iterate over numbers correctly", () => {
    const iterable = range(1, 5);
    const iterator = iterable[Symbol.iterator]();
    assert.equal(iterator.next().value, 1);
    assert.equal(iterator.next().value, 2);
    assert.equal(iterator.next().value, 3);
    assert.equal(iterator.next().value, 4);
    assert.equal(iterator.next().done, true);
  });

  it("should iterate over numbers in reverse correctly", () => {
    const iterable = range(5, 1);
    const iterator = iterable[Symbol.iterator]();
    assert.equal(iterator.next().value, 5);
    assert.equal(iterator.next().value, 4);
    assert.equal(iterator.next().value, 3);
    assert.equal(iterator.next().value, 2);
    assert.equal(iterator.next().done, true);
  });

  it("should iterate over negative numbers correctly", () => {
    const iterable = range(-5, -1);
    const iterator = iterable[Symbol.iterator]();
    assert.equal(iterator.next().value, -5);
    assert.equal(iterator.next().value, -4);
    assert.equal(iterator.next().value, -3);
    assert.equal(iterator.next().value, -2);
    assert.equal(iterator.next().done, true);
  });

  it("should iterate over numbers with negative step correctly", () => {
    const iterable = range(5, 1, -1);
    const iterator = iterable[Symbol.iterator]();
    assert.equal(iterator.next().value, 5);
    assert.equal(iterator.next().value, 4);
    assert.equal(iterator.next().value, 3);
    assert.equal(iterator.next().value, 2);
    assert.equal(iterator.next().done, true);
  });

  it("should iterate over BigInts correctly", () => {
    const iterable = range(BigInt(1), BigInt(5));
    const iterator = iterable[Symbol.iterator]();
    assert.equal(iterator.next().value, BigInt(1));
    assert.equal(iterator.next().value, BigInt(2));
    assert.equal(iterator.next().value, BigInt(3));
    assert.equal(iterator.next().value, BigInt(4));
    assert.equal(iterator.next().done, true);
  });

  it("should iterate over BigInts in reverse correctly", () => {
    const iterable = range(BigInt(5), BigInt(1));
    const iterator = iterable[Symbol.iterator]();
    assert.equal(iterator.next().value, BigInt(5));
    assert.equal(iterator.next().value, BigInt(4));
    assert.equal(iterator.next().value, BigInt(3));
    assert.equal(iterator.next().value, BigInt(2));
    assert.equal(iterator.next().done, true);
  });

  it("should iterate over numbers with incorrect bounds and direction correctly", () => {
    const iterable = range(1, 5, -1);
    const iterator = iterable[Symbol.iterator]();
    assert.equal(iterator.next().value, 1);
    assert.equal(iterator.next().value, 2);
    assert.equal(iterator.next().value, 3);
    assert.equal(iterator.next().value, 4);
    assert.equal(iterator.next().done, true);
  });

  it("should iterate over numbers with incorrect bounds and direction correctly", () => {
    const iterable = range(5, 1, 1);
    const iterator = iterable[Symbol.iterator]();
    assert.equal(iterator.next().value, 5);
    assert.equal(iterator.next().value, 4);
    assert.equal(iterator.next().value, 3);
    assert.equal(iterator.next().value, 2);
    assert.equal(iterator.next().done, true);
  });
});

it("should iterate over BigInts correctly", () => {
  const rng = range(BigInt(1), BigInt(5));
  const iterable = rng[Symbol.iterator]();
  assert.equal(iterable.next().value, BigInt(1));
  assert.equal(iterable.next().value, BigInt(2));
  assert.equal(iterable.next().value, BigInt(3));
  assert.equal(iterable.next().value, BigInt(4));
  assert.equal(iterable.next().done, true);
});

it("should iterate over BigInts in reverse correctly", () => {
  const rng = range(5n, 1n);
  const iterable = rng[Symbol.iterator]();
  assert.equal(iterable.next().value, BigInt(5));
  assert.equal(iterable.next().value, BigInt(4));
  assert.equal(iterable.next().value, BigInt(3));
  assert.equal(iterable.next().value, BigInt(2));
  assert.equal(iterable.next().done, true);
});

it("should iterate over numbers with incorrect bounds and direction correctly", () => {
  const rng = range(1, 5, -1);
  const iterable = rng[Symbol.iterator]();

  assert.equal(iterable.next().value, 1);
  assert.equal(iterable.next().value, 2);
  assert.equal(iterable.next().value, 3);
  assert.equal(iterable.next().value, 4);
  assert.equal(iterable.next().done, true);
});

it("should iterate over numbers with incorrect bounds and direction correctly", () => {
  const rng = range(5, 1, 1);
  const iterable = rng[Symbol.iterator]();

  assert.equal(iterable.next().value, 5);
  assert.equal(iterable.next().value, 4);
  assert.equal(iterable.next().value, 3);
  assert.equal(iterable.next().value, 2);
  assert.equal(iterable.next().done, true);
});

describe("String", () => {
  it("should iterate over string collection correctly", () => {
    const rng = range("a", "e");
    const iterable = rng[Symbol.iterator]();
    assert.equal(iterable.next().value, "a");
    assert.equal(iterable.next().value, "b");
    assert.equal(iterable.next().value, "c");
    assert.equal(iterable.next().value, "d");
    assert.equal(iterable.next().done, true);
  });

  it("should iterate over string collection in reverse correctly", () => {
    const rng = range("e", "a");
    const iterable = rng[Symbol.iterator]();

    assert.equal(iterable.next().value, "e");
    assert.equal(iterable.next().value, "d");
    assert.equal(iterable.next().value, "c");
    assert.equal(iterable.next().value, "b");
    assert.equal(iterable.next().done, true);
  });

  it("should iterate over string collection with negative step correctly", () => {
    const rng = range("e", "a", -1);
    const iterable = rng[Symbol.iterator]();
    assert.equal(iterable.next().value, "e");
    assert.equal(iterable.next().value, "d");
    assert.equal(iterable.next().value, "c");
    assert.equal(iterable.next().value, "b");
    assert.equal(iterable.next().done, true);
  });

  it("should iterate over string collection with negative step correctly", () => {
    const rng = range("a", "e", -1);
    const iterable = rng[Symbol.iterator]();

    assert.equal(iterable.next().value, "a");
    assert.equal(iterable.next().value, "b");
    assert.equal(iterable.next().value, "c");
    assert.equal(iterable.next().value, "d");
    assert.equal(iterable.next().done, true);
  });

  it("should iterate over string collection with positive step correctly", () => {
    const rng = range("a", "e", 1);
    const iterable = rng[Symbol.iterator]();
    assert.equal(iterable.next().value, "a");
    assert.equal(iterable.next().value, "b");
    assert.equal(iterable.next().value, "c");
    assert.equal(iterable.next().value, "d");
    assert.equal(iterable.next().done, true);
  });

  it("should iterate over Unicode characters correctly", () => {
    const rng = range("ぁ", "う"); // Japanese Hiragana
    const iterable = rng[Symbol.iterator]();
    assert.equal(iterable.next().value, "ぁ");
    assert.equal(iterable.next().value, "あ");
    assert.equal(iterable.next().value, "ぃ");
    assert.equal(iterable.next().value, "い");
    assert.equal(iterable.next().value, "ぅ");
    assert.equal(iterable.next().done, true);
  });

  it("should handle negative steps with Unicode characters correctly", () => {
    const rng = range("う", "ぁ"); // Japanese Hiragana
    const iterable = rng[Symbol.iterator]();

    assert.equal(iterable.next().value, "う");
    assert.equal(iterable.next().value, "ぅ");
    assert.equal(iterable.next().value, "い");
    assert.equal(iterable.next().value, "ぃ");
    assert.equal(iterable.next().value, "あ");
    assert.equal(iterable.next().done, true);
  });
});

describe("invalid iterators", () => {
  const rng = range("3", 5);
  const iterable = rng[Symbol.iterator]();
  assert.equal(iterable.next().done, true);
});
