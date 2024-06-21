import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should extract characters from a single string element", () => {
  const collection = "some text | another part";
  const chars = intoIterable(collection).split("");
  const result = [...chars];
  assert.deepEqual(result, collection.split(""));
});

it("should extract characters from a single string element", () => {
  const collection = "some text | another part";
  const chars = intoIterable(collection).split("|");
  const result = [...chars];
  console.log(result);
  assert.deepEqual(["some text ", " another part"], result);
});

it("should split a string into parts using a multi-character delimiter", () => {
  const collection = "apple,orange,banana";
  const parts = intoIterable(collection).split("orange");
  const result = [...parts];
  console.log(result);
  assert.deepEqual(result, ["apple,", ",banana"]);
});

it("should throw an error when splitting non-string elements", () => {
  const collection = [1, 2, 3];

  const iterable = intoIterable(collection).split(",");
  console.log(iterable.next());
  console.log(iterable.next());
  console.log(iterable.next());
  console.log(iterable.next());
});
