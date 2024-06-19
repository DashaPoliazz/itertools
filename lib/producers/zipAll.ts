import intoIterable from "../intoIter";

function zipAll(...iterables: Iterable<any>[]): Iterable<any[]> {
  return {
    /**
     * Returns an iterator object that iterates over the zipped sequence of iterables.
     *
     * @returns {Iterator<any[]>} An iterator object.
     */
    [Symbol.iterator]() {
      // Get iterators for all input iterables
      const iterators = iterables.map((iterable) =>
        iterable[Symbol.iterator](),
      );

      return {
        next: () => {
          // Check if the zipped sequence has been fully traversed
          // Retrieve the next element from each iterable and construct a tuple
          const triggeredIterators = iterators.map((iter) => iter.next());
          const consumedIterator = triggeredIterators.find((iter) => iter.done);
          if (consumedIterator) return { done: true, value: undefined };
          const value = triggeredIterators.map(({ value }) => value);
          return { done: false, value };
        },
      };
    },
  };
}

/**
 * Combines multiple iterables into a single iterable of tuples, where the nth tuple contains the nth element from each of the input iterables.
 * The iterator is done when the smallest iterable of the iterables is consumed.
 *
 * @param {...Iterable<T>} iterables - The iterables to zip together.
 * @returns {Iterable<T[]>} An iterable of tuples containing elements from all the input iterables.
 *
 * @example
 * const iterable1 = [1, 2, 3];
 * const iterable2 = ['a', 'b', 'c'];
 * const zipped = zipAll(iterable1, iterable2);
 * for (const item of zipped) {
 *   console.log(item); // Output: [1, 'a'], [2, 'b'], [3, 'c']
 * }
 */
export default function zipAllWrapper(...iterables: Iterable<any>[]) {
  return intoIterable(zipAll(...iterables));
}
