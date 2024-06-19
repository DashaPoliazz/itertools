/**
 * Creates an iterable that repeats the given item `n` times.
 *
 * @template T - The type of the item to repeat.
 * @param {T} itemToRepeat - The item to repeat.
 * @param {number} n - The number of times to repeat the item.
 * @returns {Iterable<T>} An iterable that yields the item `n` times.
 *
 * @example
 * const repeatedItems = repeatN('a', 3);
 * for (const item of repeatedItems) {
 *   console.log(item); // Output: 'a' 'a' 'a'
 * }
 */
function repeatN<T>(itemToRepeat: T, n: number): Iterable<T> {
  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          const done = --n < 0;
          return done
            ? {
                done,
                value: undefined,
              }
            : {
                done,
                value: itemToRepeat,
              };
        },
      };
    },
  };
}

export default repeatN;
