import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should apply the scan function and stop when null is returned", () => {
  const collection = [1, 2, 3, 4];
  const scanResult = intoIterable(collection).scan(1, (stateRef, item) => {
    stateRef.state *= item;
    if (stateRef.state > 6) return null;
    return -stateRef.state;
  });

  assert.deepEqual([...scanResult], [-1, -2, -6]);
});

// Test with different initial state
it("should handle different initial states correctly", () => {
  const collection = [1, 2, 3, 4];
  const scanResult = intoIterable(collection).scan(10, (stateRef, item) => {
    stateRef.state -= item;
    return stateRef.state;
  });

  assert.deepEqual([...scanResult], [9, 7, 4, 0]);
});

// Test with early termination
it("should stop processing when null is returned", () => {
  const collection = [1, 2, 3, 4];
  const scanResult = intoIterable(collection).scan(0, (stateRef, item) => {
    stateRef.state += item;
    if (stateRef.state >= 5) return null;
    return stateRef.state;
  });

  assert.deepEqual([...scanResult], [1, 3]);
});

// Test with string concatenation
it("should concatenate strings correctly", () => {
  const collection = ["a", "b", "c"];
  const scanResult = intoIterable(collection).scan("", (stateRef, item) => {
    stateRef.state += item;
    return stateRef.state;
  });

  assert.deepEqual([...scanResult], ["a", "ab", "abc"]);
});

// Test with empty collection
it("should return an empty iterable for an empty collection", () => {
  const collection: any[] = [];
  const scanResult = intoIterable(collection).scan(0, (stateRef, item) => {
    stateRef.state += item;
    return stateRef.state;
  });

  assert.deepEqual([...scanResult], []);
});

// Test with a collection that does not trigger early termination
it("should process the entire collection if no null is returned", () => {
  const collection = [1, 2, 3, 4];
  const scanResult = intoIterable(collection).scan(0, (stateRef, item) => {
    stateRef.state += item;
    return stateRef.state;
  });

  assert.deepEqual([...scanResult], [1, 3, 6, 10]);
});

// Test with a more complex state
it("should handle complex state objects correctly", () => {
  const collection = [1, 2, 3, 4];
  const scanResult = intoIterable(collection).scan(
    { sum: 0, count: 0 },
    (stateRef, item) => {
      stateRef.state.sum += item;
      stateRef.state.count += 1;
      return { ...stateRef.state };
    },
  );

  assert.deepEqual(
    [...scanResult],
    [
      { sum: 1, count: 1 },
      { sum: 3, count: 2 },
      { sum: 6, count: 3 },
      { sum: 10, count: 4 },
    ],
  );
});
