import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

describe("IterableWrapper", () => {
  it("should extract characters from a single string element", () => {
    const collection = ["hello"];
    const chars = intoIterable(collection).chars();

    const result = [...chars];
    assert.deepStrictEqual(result, ["h", "e", "l", "l", "o"]);
  });

  it("should extract characters from an array of strings", () => {
    const collection = ["apple", "banana", "cherry"];
    const chars = intoIterable(collection).chars();

    const result = [...chars];
    assert.deepStrictEqual(result, [
      "a",
      "p",
      "p",
      "l",
      "e",
      "b",
      "a",
      "n",
      "a",
      "n",
      "a",
      "c",
      "h",
      "e",
      "r",
      "r",
      "y",
    ]);
  });

  it("should extract characters from a set of strings", () => {
    const collection = new Set(["apple", "banana", "cherry"]);
    const chars = intoIterable(collection).chars();

    const result = [...chars];
    assert.deepStrictEqual(result.sort(), [
      "a",
      "a",
      "a",
      "a",
      "b",
      "c",
      "e",
      "e",
      "h",
      "l",
      "n",
      "n",
      "p",
      "p",
      "r",
      "r",
      "y",
    ]);
  });

  it("should handle mixed types gracefully", () => {
    const collection = [1, "apple", true, "banana", 42, "cherry"];
    const chars = intoIterable(collection).chars();

    const result = [...chars];
    assert.deepStrictEqual(result, [
      "a",
      "p",
      "p",
      "l",
      "e",
      "b",
      "a",
      "n",
      "a",
      "n",
      "a",
      "c",
      "h",
      "e",
      "r",
      "r",
      "y",
    ]);
  });

  it("should handle mixed types gracefully", () => {
    const collection = "hello";
    const chars = intoIterable(collection).chars();

    const result = [...chars];
    assert.deepStrictEqual(result, ["h", "e", "l", "l", "o"]);
  });
});
