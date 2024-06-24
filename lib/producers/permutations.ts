import intoIterable from "../intoIter";

function kCombinations<T>(collection: T[], k: number): Iterable<T[]> {
  function* generateCombinations(
    startIndex: number,
    current: T[],
  ): Generator<T[]> {
    if (current.length === k) {
      yield current;
      return;
    }

    for (let i = startIndex; i < collection.length; i++) {
      yield* generateCombinations(i + 1, [...current, collection[i]]);
    }
  }

  return {
    [Symbol.iterator]() {
      return generateCombinations(0, []);
    },
  };
}

/**
 * Generates all combinations of size k from the given collection.
 * Each combination is represented as an array of elements from the collection.
 *
 * @template T The type of elements in the collection.
 * @param {T[]} collection The collection from which to generate combinations.
 * @param {number} k The size of combinations to generate.
 * @returns {Iterable<T[]>} An iterable object that yields combinations of size k.
 *
 * @example
 * // Example usage:
 * const collection = [1, 2, 3, 4];
 * const k = 2;
 * const iter = kCombinations(collection, k);
 * const combinations = Array.from(iter); // [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
 *
 * @example
 * // Example with strings:
 * const strings = ['a', 'b', 'c', 'd'];
 * const k = 3;
 * const iter = kCombinations(strings, k);
 * const combinations = Array.from(iter); // [['a', 'b', 'c'], ['a', 'b', 'd'], ['a', 'c', 'd'], ['b', 'c', 'd']]
 */
export default <T>(collection: Iterable<T>, k: number) =>
  intoIterable(kCombinations(Array.from(collection), k));
