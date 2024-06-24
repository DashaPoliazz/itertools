import intoIterable from "../intoIter";

function combinations<T>(iterable: Iterable<T>, k: number = 1): Iterable<T[]> {
  const collection = Array.from(iterable);
  const stack: { startIndex: number; current: T[] }[] = [];
  const result: T[][] = [];

  // Initialize stack with initial combinations
  for (let i = 0; i < collection.length; i++) {
    stack.push({ startIndex: i, current: [collection[i]] });
  }

  return {
    [Symbol.iterator]() {
      return {
        next() {
          if (k > collection.length) return { done: true, value: undefined };

          while (stack.length > 0) {
            const { startIndex, current } = stack.pop()!;

            if (current.length === k) {
              result.push(current);
            } else {
              for (let i = 0; i < collection.length; i++) {
                if (i !== startIndex) {
                  stack.push({
                    startIndex: i,
                    current: [...current, collection[i]],
                  });
                }
              }
            }

            // If result has items, return the first one
            if (result.length > 0) {
              return { done: false, value: result.shift()! };
            }
          }

          return { done: true, value: undefined };
        },
      };
    },
  };
}

/**
 * Generates all possible combinations of a given collection with a specified length.
 *
 * @template T - The type of elements in the collection.
 * @param {Iterable<T>} iterable - The collection from which to generate combinations.
 * @param {number} [k=1] - The number of elements in each combination.
 * @returns {Iterable<T[]>} - An iterable of combinations.
 *
 * @example
 * // Example with a collection of numbers
 * const collection = [1, 2, 3];
 * const combination = combinations(collection, 2);
 * for (const comb of combination) {
 *   console.log(comb);
 * }
 *
 * // Output:
 * [3, 2],
 * [3, 1],
 * [2, 3],
 * [2, 1],
 * [1, 3],
 * [1, 2],
 *
 * @example
 * // Example with an empty collection
 * const emptyCollection: any[] = [];
 * const emptyCombination = combinations(emptyCollection, 2);
 * console.log([...emptyCombination]);
 * // Output: []
 */
export default <T>(collections: Iterable<T>, k = 1) =>
  intoIterable(combinations(collections, k));
