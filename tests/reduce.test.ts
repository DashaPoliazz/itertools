import { it, describe } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should reduce values correctly with sum", () => {
  const collection = [1, 2, 3];
  const sumReduce = intoIterable(collection).reduce(
    (acc, item) => acc + item,
    0,
  );
  const sum = intoIterable(collection).sum();

  assert.equal(sumReduce, sum);
});

it("should reduce values correctly with multiplication", () => {
  const collection = [1, 2, 3, 4];
  const productReduce = intoIterable(collection).reduce(
    (acc, item) => acc * item,
    1,
  );
  const product = intoIterable(collection).reduce((acc, item) => acc * item, 1);

  assert.equal(productReduce, product);
});

it("should return initial value with empty collection", () => {
  const collection: any[] = [];
  const result = intoIterable(collection).reduce((acc, item) => acc + item, 0);

  assert.equal(result, 0);
});

it("should reduce values correctly with string concatenation", () => {
  const collection = ["hello", " ", "world"];
  const concatReduce = intoIterable(collection).reduce(
    (acc, item) => acc + item,
    "",
  );
  const concat = intoIterable(collection).reduce((acc, item) => acc + item, "");

  assert.equal(concatReduce, concat);
});

it("should reduce to object correctly", () => {
  const collection = ["first", "second", "third"];
  type Accumulator = { [key: string]: number };

  const initialValue: Accumulator = {};
  const aggregatedData = intoIterable(collection).reduce((acc, word) => {
    acc[word] = word.length;
    return acc;
  }, initialValue);
  assert.deepEqual(aggregatedData, { first: 5, second: 6, third: 5 });
});
