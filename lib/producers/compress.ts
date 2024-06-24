import intoIterable from "../intoIter";

function compress<T>(iterable: Iterable<T>, selectors: boolean[]): Iterable<T> {
  return {
    [Symbol.iterator]() {
      let idx = 0;
      const iterator = iterable[Symbol.iterator]();
      const consumedIterator: IteratorResult<T> = {
        done: true,
        value: undefined as any,
      };
      let iter = iterator.next();

      return {
        next(): IteratorResult<T> {
          while (!selectors[idx] && idx < selectors.length) {
            idx++;
            iter = iterator.next();
          }

          if (idx >= selectors.length || iter.done) return consumedIterator;

          const value = iter.value;
          idx++;
          iter = iterator.next();

          return { value, done: false };
        },
      };
    },
  };
}

/**
 * Compresses the input iterable based on the selectors array.
 * Returns elements from the iterable where the corresponding element in selectors is true.
 * Stops when either the data or selectors iterables have been exhausted.
 *
 * @template T
 * @param {Iterable<T>} iterable - The iterable to be compressed.
 * @param {boolean[]} selectors - An array of booleans indicating which elements to include.
 * @returns {Iterable<T>} An iterable with the compressed elements.
 *
 * @example
 * // Example 1: Basic functionality
 * const data = ["apple", "banana", "cherry", "date"];
 * const selectors = [true, false, true, false];
 * const compressed = compress(data, selectors);
 * console.log([...compressed]); // Output: ["apple", "cherry"]
 *
 * @example
 * // Example 2: All true selectors
 * const data = ["apple", "banana", "cherry", "date"];
 * const selectors = [true, true, true, true];
 * const compressed = compress(data, selectors);
 * console.log([...compressed]); // Output: ["apple", "banana", "cherry", "date"]
 *
 * @example
 * // Example 3: All false selectors
 * const data = ["apple", "banana", "cherry", "date"];
 * const selectors = [false, false, false, false];
 * const compressed = compress(data, selectors);
 * console.log([...compressed]); // Output: []
 */
export default <T>(
  collections: Iterable<T>,
  selectors: boolean[],
): Iterable<T> => intoIterable(compress(collections, selectors));
