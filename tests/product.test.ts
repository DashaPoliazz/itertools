import { it } from "node:test";
import assert from "node:assert";
import product from "../lib/producers/product";

it("should calculate cartesian product correctly", () => {
  // Test case 1: Basic scenario
  const list1 = [1, 2];
  const list2 = ["a", "b"];
  const list3 = [true, false];

  const iter1 = product<any>(list1, list2, list3);
  assert.deepEqual(
    [...iter1],
    [
      [2, "b", false],
      [2, "b", true],
      [2, "a", false],
      [2, "a", true],
      [1, "b", false],
      [1, "b", true],
      [1, "a", false],
      [1, "a", true],
    ],
  );

  // Test case 2: Empty lists
  const iter2 = product([], [], []);
  assert(iter2.next().done, "Iterator should be done for empty lists");

  // Test case 3: Single-element lists
  const list4 = [1];
  const list5 = ["a"];
  const list6 = [true];
  const iter3 = product<any>(list4, list5, list6);
  assert.deepStrictEqual(iter3.next().value, [1, "a", true]);
  assert(iter3.next().done, "Iterator should be done for single-element lists");

  // Test case 4: Lists with different types
  const list7 = [1, 2];
  const list8 = ["a", "b"];
  const list9 = [true];
  const iter4 = product<any>(list7, list8, list9);
  assert.deepEqual(
    [...iter4],
    [
      [2, "b", true],
      [2, "a", true],
      [1, "b", true],
      [1, "a", true],
    ],
  );

  // Test case 5: Large input sets
  const largeList = Array.from({ length: 10 }, (_, index) =>
    Array.from({ length: index + 1 }, (_, i) => i + 1),
  );
  const iter5 = product(...largeList);
  let count = 0;
  for (const _ of iter5) {
    count++;
  }
  assert.strictEqual(
    count,
    largeList.reduce((acc, list) => acc * list.length, 1),
    "Incorrect number of combinations for large input sets",
  );
});
