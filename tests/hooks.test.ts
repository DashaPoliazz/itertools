import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should handle hooks correctly", () => {
  const collection = [1, 2, 3, 4, 5];
  const iterable = intoIterable(collection)
    .map((x) => x + 1)
    .enumerate()
    .onCompletion((result) => console.log("hook1", result))
    .onCompletion((result) => console.log("hook2", result));

  const log = [];
  for (const [idx, elem] of iterable) {
    if (idx === 3) {
      break;
    }
    log.push([idx, elem]);
  }

  // Test that hooks are called after early termination
  assert.strictEqual(log.length, 3);
});

it("should execute all hooks on completion", () => {
  const collection = [1, 2, 3, 4, 5];
  const iterable = intoIterable(collection)
    .map((x) => x + 1)
    .enumerate()
    .onCompletion((result) => console.log("Completion hook 1:", result))
    .onCompletion((result) => console.log("Completion hook 2:", result));

  const log = [];
  for (const [idx, elem] of iterable) {
    log.push([idx, elem]);
  }

  // Simulate some post-iteration processing
  console.log("Post iteration");

  // Ensure hooks are executed after the iteration
  assert.strictEqual(log.length, 5);
});

it("should handle hooks on empty iterable", () => {
  const collection: number[] = [];
  const iterable = intoIterable(collection)
    .map((x) => x + 1)
    .enumerate()
    .onCompletion((result) => console.log("Empty iterable hook:", result));

  const log = [];
  for (const [idx, elem] of iterable) {
    log.push([idx, elem]);
  }

  // Ensure hooks are executed even with an empty iterable
  assert.strictEqual(log.length, 0);
});
