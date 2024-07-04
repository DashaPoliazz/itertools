import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";
import range from "../lib/producers/range";

it("should yield values correctly without comparator", () => {
  const a = [0, 3, 6, 9];
  const b = [0, 5, 10];
  const merged = intoIterable(a).merge(b);
  assert.deepEqual([...merged], [0, 0, 3, 5, 6, 10, 9]);
});

it("should yield values correctly with comparator (numbers)", () => {
  const a = [0, 3, 6, 9];
  const b = [0, 5, 10];
  const comparator = (x: number, y: number) => x - y;
  const merged = intoIterable(a).merge(b, comparator);
  assert.deepEqual([...merged], [0, 0, 3, 5, 6, 9, 10]);
});

it("should yield values correctly with comparator (strings)", () => {
  const a = ["apple", "orange"];
  const b = ["banana", "pear"];
  const comparator = (x: string, y: string) => x.localeCompare(y);
  const merged = intoIterable(a).merge(b, comparator);
  assert.deepEqual([...merged], ["apple", "banana", "orange", "pear"]);
});

it("should yield values correctly", () => {
  // Test case 1: Both collections have elements
  const a1 = [0, 3, 6, 9];
  const b1 = [0, 5, 10];
  const merged1 = intoIterable(a1).merge(b1);
  assert.deepEqual([...merged1], [0, 0, 3, 5, 6, 10, 9]);

  // Test case 2: One collection is empty
  const a2: number[] = [];
  const b2 = [1, 2, 3];
  const merged2 = intoIterable(a2).merge(b2);
  assert.deepEqual([...merged2], [1, 2, 3]);

  // Test case 3: Another collection is empty
  const a3 = [1, 2, 3];
  const b3: number[] = [];
  const merged3 = intoIterable(a3).merge(b3);
  assert.deepEqual([...merged3], [1, 2, 3]);

  // Test case 4: Both collections are empty
  const a4: number[] = [];
  const b4: number[] = [];
  const merged4 = intoIterable(a4).merge(b4);
  assert.deepEqual([...merged4], []);

  // Test case 5: One collection is fully consumed before the other
  const a5 = [0, 3, 6, 9];
  const b5 = [0, 5, 10, 15, 20];
  const merged5 = intoIterable(a5).merge(b5);
  assert.deepEqual([...merged5], [0, 0, 3, 5, 6, 10, 9, 15, 20]);

  // Test case 6: Vice versa, the other collection is fully consumed first
  const a6 = [0, 3, 6, 9, 12, 15];
  const b6 = [0, 5, 10];
  const merged6 = intoIterable(a6).merge(b6);
  assert.deepEqual([...merged6], [0, 0, 3, 5, 6, 10, 9, 12, 15]);
});
