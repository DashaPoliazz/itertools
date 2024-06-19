import intoIterable from "../intoIter";

function once<T>(value: T): Iterable<T> {
  return {
    [Symbol.iterator]() {
      let hasBeenCalled = false;

      return {
        next: () => {
          if (hasBeenCalled) return { done: true, value: undefined };
          hasBeenCalled = true;
          return { done: false, value };
        },
      };
    },
  };
}

/**
 * Creates an iterable that yields a single value once, and then becomes done.
 *
 * @template T - The type of the value to yield.
 * @param {T} value - The value to yield once.
 * @returns {Iterable<T>} An iterable that yields the value once.
 *
 * @example
 * // Basic usage with for...of loop
 * const iterable = once('Hello');
 * for (const item of iterable) {
 *   console.log(item); // Output: 'Hello'
 * }
 *
 * // Using the spread operator with once iterable
 * console.log([...once(42)]); // Output: [42]
 *
 * // Using with Array.from
 * console.log(Array.from(once(true))); // Output: [true]
 *
 * // Chaining with intoIterable
 * const doubled = intoIterable(once(3))
 *   .map(x => x * 2)
 *   .filter(x => x > 5);
 * console.log([...doubled]); // Output: [6]
 */
export default <T>(value: T) => intoIterable(once<T>(value));
