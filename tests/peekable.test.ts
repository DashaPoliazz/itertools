import assert from "assert";
import { it } from "node:test";
import intoIterable from "../lib/intoIter";

it("should yield the value once and then be done", () => {
  const collection = [1, 2, 3, 4, 5];
  const addone = (x: number) => x + 1;
  const iterable = intoIterable(collection)
    .map(addone)
    .map(addone)
    .map(addone)
    .take(3);
  console.log([...iterable]);
});
