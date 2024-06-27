import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should extract characters from a single string element", () => {
  const collection = "some text | another part";
  const chars = intoIterable(collection).split("");
  const result = [...chars];
  assert.deepEqual(result, collection.split(""));
});

it("should split a string into parts using a single character delimiter", () => {
  const collection = "some text | another part";
  const parts = intoIterable(collection).split("|");
  const result = [...parts];
  assert.deepEqual(result, ["some text ", " another part"]);
});

it("should split a string into parts using a multi-character delimiter", () => {
  const collection = "apple,orange,banana";
  const parts = intoIterable(collection).split("orange");
  const result = [...parts];
  assert.deepEqual(result, ["apple,", ",banana"]);
});

it("should split a string using a regular expression delimiter", () => {
  const collection = "one1two2three3four";
  const parts = intoIterable(collection).split(/\d/);
  const result = [...parts];
  assert.deepEqual(result, ["one", "two", "three", "four"]);
});

it("should handle multiple delimiters using a regular expression", () => {
  const collection = "one, two; three|four";
  const parts = intoIterable(collection).split(/[,;|]\s*/);
  const result = [...parts];
  assert.deepEqual(result, ["one", "two", "three", "four"]);
});

it("should handle delimiters at the start and end of the string", () => {
  const collection = ",one,two,";
  const parts = intoIterable(collection).split(",");
  const result = [...parts];
  assert.deepEqual(result, ["", "one", "two", ""]);
});

it("should handle consecutive delimiters", () => {
  const collection = "one,,two,,three";
  const parts = intoIterable(collection).split(",,");
  const result = [...parts];
  assert.deepEqual(result, ["one", "two", "three"]);
});

it("should handle no delimiters", () => {
  const collection = "one two three";
  const parts = intoIterable(collection).split(",");
  const result = [...parts];
  assert.deepEqual(result, ["one two three"]);
});

it("should handle a pattern that matches the entire string", () => {
  const collection = "apple";
  const parts = intoIterable(collection).split("apple");
  const result = [...parts];
  assert.deepEqual(result, ["", ""]);
});

it("should handle an empty string with any pattern", () => {
  const collection = "";
  const parts = intoIterable(collection).split(",");
  const result = [...parts];
  assert.deepEqual(result, [""]);
});
