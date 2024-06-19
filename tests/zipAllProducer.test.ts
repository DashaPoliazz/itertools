import { it } from "node:test";
import assert from "assert";
import zipAll from "../lib/producers/zipAll";
import intoIterable from "../lib/intoIter";

it("should zip all provided iterators correctly", () => {
  const collection1 = [1, 2];
  const collection2 = [3, 4];
  const collectino3 = [5, 6];
  const ziped = zipAll(collection1, collection2, collectino3);

  assert.deepEqual(ziped.next(), { done: false, value: [1, 3, 5] });
  assert.deepEqual(ziped.next(), { done: false, value: [2, 4, 6] });
  assert.deepEqual(ziped.next(), { done: true, value: undefined });
});

it("should correctly work with iterables", () => {
  const collection = [1, 2, 3];

  const maped = intoIterable(collection).map((x) => x + 1);
  const revered = intoIterable(collection).rev();
  const enumerated = intoIterable(collection).enumerate();

  const ziped = zipAll(maped, revered, enumerated);

  assert.deepEqual(ziped.next(), { done: false, value: [2, 3, [0, 1]] });
  assert.deepEqual(ziped.next(), { done: false, value: [3, 2, [1, 2]] });
  assert.deepEqual(ziped.next(), { done: false, value: [4, 1, [2, 3]] });
  assert.deepEqual(ziped.next(), { done: true, value: undefined });
});

it("should correctly work with consumed iterator", () => {
  const longestIterable = [1, 2, 3];
  const shortestIterable = [3];

  const maped = intoIterable(longestIterable).map((x) => x + 1);
  const revered = intoIterable(shortestIterable).rev();
  const enumerated = intoIterable(longestIterable).enumerate();

  const ziped = zipAll(maped, revered, enumerated);

  assert.deepEqual(ziped.next(), { done: false, value: [2, 3, [0, 1]] });
  assert.deepEqual(ziped.next(), { done: true, value: undefined });
});
