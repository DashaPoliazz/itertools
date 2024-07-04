import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should intersperse correctly for number collection", () => {
  const collection = [0, 1, 2];
  const interspersed = intoIterable(collection).intersperse(8);
  assert.deepEqual([...interspersed], [0, 8, 1, 8, 2]);
});

it("should intersperse correctly for string collection", () => {
  const collection = ["a", "b", "c"];
  const interspersed = intoIterable(collection).intersperse("x");
  assert.deepEqual([...interspersed], ["a", "x", "b", "x", "c"]);
});

it("should handle empty collection", () => {
  const collection: number[] = [];
  const interspersed = intoIterable(collection).intersperse(8);
  assert.deepEqual([...interspersed], []);
});

it("should handle single-element collection", () => {
  const collection = [5];
  const interspersed = intoIterable(collection).intersperse(8);
  assert.deepEqual([...interspersed], [5]);
});

it("should handle large collection with varying intersperse elements", () => {
  const collection = Array.from({ length: 100 }, (_, index) => index);
  const interspersed1 = intoIterable(collection).intersperse(10);
  assert.deepEqual(
    [...interspersed1],
    [
      0, 10, 1, 10, 2, 10, 3, 10, 4, 10, 5, 10, 6, 10, 7, 10, 8, 10, 9, 10, 10,
      10, 11, 10, 12, 10, 13, 10, 14, 10, 15, 10, 16, 10, 17, 10, 18, 10, 19,
      10, 20, 10, 21, 10, 22, 10, 23, 10, 24, 10, 25, 10, 26, 10, 27, 10, 28,
      10, 29, 10, 30, 10, 31, 10, 32, 10, 33, 10, 34, 10, 35, 10, 36, 10, 37,
      10, 38, 10, 39, 10, 40, 10, 41, 10, 42, 10, 43, 10, 44, 10, 45, 10, 46,
      10, 47, 10, 48, 10, 49, 10, 50, 10, 51, 10, 52, 10, 53, 10, 54, 10, 55,
      10, 56, 10, 57, 10, 58, 10, 59, 10, 60, 10, 61, 10, 62, 10, 63, 10, 64,
      10, 65, 10, 66, 10, 67, 10, 68, 10, 69, 10, 70, 10, 71, 10, 72, 10, 73,
      10, 74, 10, 75, 10, 76, 10, 77, 10, 78, 10, 79, 10, 80, 10, 81, 10, 82,
      10, 83, 10, 84, 10, 85, 10, 86, 10, 87, 10, 88, 10, 89, 10, 90, 10, 91,
      10, 92, 10, 93, 10, 94, 10, 95, 10, 96, 10, 97, 10, 98, 10, 99,
    ],
  );

  const interspersed2 = intoIterable(collection).intersperse(1000);
  assert.deepEqual(
    [...interspersed2],
    [
      0, 1000, 1, 1000, 2, 1000, 3, 1000, 4, 1000, 5, 1000, 6, 1000, 7, 1000, 8,
      1000, 9, 1000, 10, 1000, 11, 1000, 12, 1000, 13, 1000, 14, 1000, 15, 1000,
      16, 1000, 17, 1000, 18, 1000, 19, 1000, 20, 1000, 21, 1000, 22, 1000, 23,
      1000, 24, 1000, 25, 1000, 26, 1000, 27, 1000, 28, 1000, 29, 1000, 30,
      1000, 31, 1000, 32, 1000, 33, 1000, 34, 1000, 35, 1000, 36, 1000, 37,
      1000, 38, 1000, 39, 1000, 40, 1000, 41, 1000, 42, 1000, 43, 1000, 44,
      1000, 45, 1000, 46, 1000, 47, 1000, 48, 1000, 49, 1000, 50, 1000, 51,
      1000, 52, 1000, 53, 1000, 54, 1000, 55, 1000, 56, 1000, 57, 1000, 58,
      1000, 59, 1000, 60, 1000, 61, 1000, 62, 1000, 63, 1000, 64, 1000, 65,
      1000, 66, 1000, 67, 1000, 68, 1000, 69, 1000, 70, 1000, 71, 1000, 72,
      1000, 73, 1000, 74, 1000, 75, 1000, 76, 1000, 77, 1000, 78, 1000, 79,
      1000, 80, 1000, 81, 1000, 82, 1000, 83, 1000, 84, 1000, 85, 1000, 86,
      1000, 87, 1000, 88, 1000, 89, 1000, 90, 1000, 91, 1000, 92, 1000, 93,
      1000, 94, 1000, 95, 1000, 96, 1000, 97, 1000, 98, 1000, 99,
    ],
  );
});
