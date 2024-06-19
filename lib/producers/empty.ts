import intoIterable from "../intoIter";

function empty<T>(): Iterable<T> {
  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          return { done: true, value: undefined };
        },
      };
    },
  };
}

/**
 * Creates an empty iterable.
 *
 * @template T - The type of items (if any) the iterable would yield.
 * @returns {Iterable<T>} An iterable that yields no items.
 *
 * @example
 * // Basic usage with for...of loop
 * const emptyIterable = empty();
 * for (const item of emptyIterable) {
 *   console.log(item); // No output, as the iterable is empty.
 * }
 *
 * // Using the spread operator with empty iterable
 * console.log([...emptyIterable]); // Output: []
 *
 * // Using with Array.from
 * console.log(Array.from(emptyIterable)); // Output: []
 *
 * // Chaining with intoIterable
 * const chainedIterable = intoIterable(empty())
 *   .map(x => x * 2)
 *   .filter(x => x > 1);
 *
 * // Iterating over the chained iterable
 * for (const item of chainedIterable) {
 *   console.log(item); // No output, as the iterable is empty.
 * }
 */
export default <T>() => intoIterable(empty<T>());
