import intoIterable from "../intoIter";

function product<T>(...iterables: Iterable<T>[]): Iterable<T[]> {
  return {
    [Symbol.iterator]() {
      const stack: T[][] = [[]];

      return {
        next() {
          if (stack.length === 0) {
            return { done: true, value: undefined };
          }
          while (stack.length > 0) {
            const current = stack.pop();
            if (current!.length === iterables.length) {
              return { done: false, value: current! };
            }
            const idx = current!.length;
            const collection = iterables[idx];
            for (const item of collection) {
              stack.push([...current!, item]);
            }
          }
          return { done: true, value: undefined };
        },
      };
    },
  };
}

/**
 * Generates the Cartesian product of multiple iterable collections.
 * @template T - The type of elements in the input iterables.
 * @param {...Iterable<T>[]} iterables - Iterable collections to compute the product.
 * @returns {Iterable<T[]>} - Iterable yielding arrays representing each combination.
 * @example
 * // Example 1: Cartesian product of three lists
 * const list1 = [1, 2];
 * const list2 = ["a", "b"];
 * const list3 = [true, false];
 * const iter = product(list1, list2, list3);
 * for (const combination of iter) {
 *   console.log(combination); // e.g., [1, "a", true], [1, "b", true], ...
 * }
 *
 * // Example 2: Cartesian product with empty list
 * const emptyList = [];
 * const iterEmpty = product(emptyList);
 * console.log([...iterEmpty]); // Outputs [[]]
 */ export default <T>(...collections: Iterable<T>[]) =>
  intoIterable(product(...collections));
