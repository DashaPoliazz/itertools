import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should repeat elements using cycle", () => {
  const collection = [1, 2, 3];
  const cycle = intoIterable(collection).cycle().take(6);

  const result = Array.from(cycle);
  assert.deepEqual(result, [1, 2, 3, 1, 2, 3]);
});

it("should work correctly when chained with other iterators", () => {
  // Example 1: Chaining with map
  const collection1 = [1, 2, 3];
  const chained1 = intoIterable(collection1)
    .cycle()
    .map((x) => x * 2)
    .take(6);

  const result1 = Array.from(chained1);
  assert.deepStrictEqual(result1, [2, 4, 6, 2, 4, 6]);

  // Example 2: Chaining with filter
  const collection2 = [1, 2, 3, 4, 5];
  const chained2 = intoIterable(collection2)
    .cycle()
    .filter((x) => x % 2 === 0)
    .take(6);

  const result2 = Array.from(chained2);

  assert.deepStrictEqual(result2, [2, 4, 2, 4, 2, 4]);

  // Example 3: Chaining with take after cycle
  const collection3 = [1, 2, 3];
  const chained3 = intoIterable(collection3).cycle().take(5);

  const result3 = Array.from(chained3);
  assert.deepStrictEqual(result3, [1, 2, 3, 1, 2]);
});
