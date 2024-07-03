import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should slice iterable into chunks correctly", () => {
  const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const size = 2;
  const chunked = intoIterable(collection).chunks(size);
  assert.deepEqual(
    [...chunked],
    [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
    ],
  );
});

it("should handle chunk size larger than collection length", () => {
  const collection = [1, 2, 3];
  const size = 5;
  const chunked = intoIterable(collection).chunks(size);
  assert.deepEqual([...chunked], [[1, 2, 3]]);
});

it("should handle collections that are not perfectly divisible by chunk size", () => {
  const collection = [1, 2, 3, 4, 5];
  const size = 3;
  const chunked = intoIterable(collection).chunks(size);
  assert.deepEqual(
    [...chunked],
    [
      [1, 2, 3],
      [4, 5],
    ],
  );
});

it("should handle an empty collection", () => {
  const collection: any[] = [];
  const size = 3;
  const chunked = intoIterable(collection).chunks(size);
  assert.deepEqual([...chunked], []);
});

it("should handle chunk size of 1", () => {
  const collection = [1, 2, 3, 4, 5];
  const size = 1;
  const chunked = intoIterable(collection).chunks(size);
  assert.deepEqual([...chunked], [[1], [2], [3], [4], [5]]);
});

it("should handle chunk size of 0 by returning empty chunks", () => {
  const collection = [1, 2, 3, 4, 5];
  const size = 0;
  const chunked = intoIterable(collection).chunks(size);
  assert.deepEqual([...chunked], []);
});

it("should handle chunk with negative size", () => {
  const collection = [1, 2, 3, 4, 5];
  const size = -1;
  const chunked = intoIterable(collection).chunks(size);
  assert.deepEqual([...chunked], []);
});
