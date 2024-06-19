import createMapIterable from "./modifiers/createMapIterable";
import createFilterIterable from "./modifiers/createFilterIterable";
import createTakeIterable from "./other/createTakeIterable";
import createForEachIterable from "./other/createForEachIterable";
import createRevIterable from "./other/createRevIterable";
import createSkipIterable from "./other/createSkipIterable";
import createEnumerateIterable from "./modifiers/createEnumerateIterable";
import createZipIterable from "./modifiers/createZipIterable";
import createZipAllIterable from "./modifiers/createZipAllIterable";
import createCycleIterable from "./other/createCycleIterable";

import sum from "./aggregators/sum";
import count from "./aggregators/count";

type MapFn<T, U> = (item: T) => U;
type Predicate<T> = (item: T) => boolean;
type ForEachCb<T> = (item: T) => void;

/**
 * A wrapper class for iterables providing additional utility methods.
 *
 * @template T
 */
class IterableWrapper<T> {
  /**
   * The original iterable.
   * @type {Iterable<T>}
   */
  iterable: Iterable<T>;

  /**
   * The iterator derived from the iterable.
   * @type {Iterator<T>}
   */
  iterator: Iterator<T>;

  /**
   * Creates an instance of IterableWrapper.
   * @param {Iterable<T>} iterable - The iterable to wrap.
   */
  constructor(iterable: Iterable<T>) {
    this.iterable = iterable;
    this.iterator = iterable[Symbol.iterator]();
  }

  /**
   * Creates a new instance of IterableWrapper.
   * @template T
   * @param {Iterable<T>} iterable - The iterable to wrap.
   * @returns {IterableWrapper<T>}
   */
  static new<T>(iterable: Iterable<T>): IterableWrapper<T> {
    return new IterableWrapper(iterable);
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    return this.iterator.next();
  }

  /**
   * Maps the elements of the iterable using the provided function.
   *
   * @template U
   * @param {MapFn<T, U>} fn - The function to apply to each element.
   * @returns {IterableWrapper<U>} - A new IterableWrapper instance containing the mapped elements.
   *
   * @example
   * const collection = [1, 2, 3, 4, 5];
   * const addOne = (x: number) => x + 1;
   *
   * // Create an IterableWrapper and apply map to it
   * const iterable = intoIterable(collection).map(addOne);
   *
   * // Iterate using next()
   * const iterator = iterable[Symbol.iterator]();
   * console.log(iterator.next().value); // Output: 2
   * console.log(iterator.next().value); // Output: 3
   * console.log(iterator.next().value); // Output: 4
   * console.log(iterator.next().value); // Output: 5
   * console.log(iterator.next().value); // Output: 6
   * console.log(iterator.next().done);  // Output: true
   *
   * // Convert to array using spread operator
   * const result = [...iterable];
   * console.log(result); // Output: [2, 3, 4, 5, 6]
   */
  map<U>(fn: MapFn<T, U>): IterableWrapper<U> {
    const iter = this.iterator;
    const mapIterable = createMapIterable(iter, fn);
    const iterableWrapper = IterableWrapper.new(mapIterable);
    return iterableWrapper;
  }

  /**
   * Filters the elements of the iterable using the provided predicate function.
   *
   * @param {Predicate<T>} predicate - The predicate function to apply to each element.
   * @returns {IterableWrapper<T>} - A new IterableWrapper instance containing the filtered elements.
   *
   * @example
   * const collection = [1, 2, 3, 4, 5];
   * const isEven = (x) => x % 2 === 0;
   *
   * // Create an IterableWrapper and apply filter to it
   * const iterable = intoIterable(collection).filter(isEven);
   *
   * // Iterate using next()
   * const iterator = iterable[Symbol.iterator]();
   * console.log(iterator.next().value); // Output: 2
   * console.log(iterator.next().value); // Output: 4
   * console.log(iterator.next().done);  // Output: true
   *
   * // Convert to array using spread operator
   * const result = [...iterable];
   * console.log(result); // Output: [2, 4]
   */
  filter(predicate: Predicate<T>): IterableWrapper<T> {
    const iter = this.iterator;
    const filterIterable = createFilterIterable(iter, predicate);
    const iterableWrapper = IterableWrapper.new(filterIterable);
    return iterableWrapper;
  }

  /**
   * Enumerates the elements of the iterable, pairing each element with its index.
   *
   * @returns {IterableWrapper<[number, T]>} - A new IterableWrapper instance where each element is paired with its index.
   *
   * @example
   * const collection = ['a', 'b', 'c', 'd'];
   *
   * // Create an IterableWrapper and apply enumerate to it
   * const iterable = intoIterable(collection).enumerate();
   *
   * // Iterate using next()
   * const iterator = iterable[Symbol.iterator]();
   * console.log(iterator.next().value); // Output: [0, 'a']
   * console.log(iterator.next().value); // Output: [1, 'b']
   * console.log(iterator.next().value); // Output: [2, 'c']
   * console.log(iterator.next().value); // Output: [3, 'd']
   * console.log(iterator.next().done);  // Output: true
   *
   * // Convert to array using spread operator
   * const result = [...iterable];
   * console.log(result); // Output: [[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']]
   */
  enumerate() {
    const iter = this.iterator;
    const enumerateIterable = createEnumerateIterable(iter);
    const iterableWrapper = IterableWrapper.new(enumerateIterable);
    return iterableWrapper;
  }

  /**
   * Sums the elements of the iterable.
   *
   * @returns {number} - The sum of all elements in the iterable.
   *
   * @example
   * const collection = [1, 2, 3, 4, 5];
   *
   * // Create an IterableWrapper and apply sum to it
   * const iterable = intoIterable(collection);
   * const sumResult = iterable.sum();
   * console.log(sumResult); // Output: 15
   */
  sum(this: IterableWrapper<number>): number {
    const sumResult = sum(this.iterable);
    return sumResult;
  }

  /**
   * Counts the number of elements in an iterable.
   *
   * @param {Iterable<any>} iter - The iterable to count elements from.
   * @returns {number} - The number of elements in the iterable.
   *
   * @example
   * // Counting elements in an array
   * const array = [1, 2, 3];
   * const result = count(array);
   * console.log(result); // Output: 3
   *
   * @example
   * // Counting elements in a Set
   * const set = new Set([1, 2, 3]);
   * const result = count(set);
   * console.log(result); // Output: 3
   *
   * @example
   * // Counting elements in a string
   * const string = "hello";
   * const result = count(string);
   * console.log(result); // Output: 5
   */
  count(): number {
    const countResult = count(this.iterable);
    return countResult;
  }

  /**
   * Takes the first n elements from the iterable.
   * @param {number} n - The number of elements to take.
   * @returns {IterableWrapper<T>}
   */
  take(n: number): IterableWrapper<T> {
    let iter = this.iterator;

    if (n < 0) {
      const length = Array.from(this.iterable).length;
      const skipCount = Math.max(0, length + n);
      iter = createSkipIterable(iter, skipCount)[Symbol.iterator]();
    }

    const takeCount = Math.abs(n);
    const takeIterable = createTakeIterable(iter, takeCount);
    const iterableWrapper = IterableWrapper.new(takeIterable);

    return iterableWrapper;
  }

  /**
   * Applies a side effect for each element in the iterable.
   *
   * @param {ForEachCb<T>} cb - The callback function to apply to each element.
   * @returns {IterableWrapper<T>} - A new IterableWrapper instance.
   *
   * @example
   * const collection = [1, 2, 3, 4, 5];
   * const result = [];
   *
   * // Create an IterableWrapper and apply forEach to it
   * const iterable = intoIterable(collection).forEach((x) => result.push(x));
   *
   * // Iterate using next()
   * const iterator = iterable[Symbol.iterator]();
   * console.log(iterator.next().value); // Output: 1
   * console.log(iterator.next().value); // Output: 2
   * console.log(iterator.next().value); // Output: 3
   * console.log(iterator.next().value); // Output: 4
   * console.log(iterator.next().value); // Output: 5
   * console.log(iterator.next().done);  // Output: true
   *
   * // Check the result array
   * console.log(result); // Output: [1, 2, 3, 4, 5]
   */
  forEach(cb: ForEachCb<T>): IterableWrapper<T> {
    const iter = this.iterator;
    const forEachIterable = createForEachIterable(iter, cb);
    const iterableWrapper = IterableWrapper.new(forEachIterable);
    return iterableWrapper;
  }

  /**
   * Reverses the elements of the iterable.
   *
   * @returns {IterableWrapper<T>} - A new IterableWrapper instance with elements reversed.
   *
   * @example
   * const collection2 = ["apple", "banana", "cherry"];
   * const reversed2 = intoIterable(collection2).rev();
   * console.log([...reversed2]); // Output: ["cherry", "banana", "apple"]
   */
  rev(): IterableWrapper<T> {
    const collection = Array.from(this.iterable);
    const revIterable = createRevIterable(collection);
    const iterableWrapper = IterableWrapper.new(revIterable);
    return iterableWrapper;
  }

  /**
   * Skips the first n elements of the iterable.
   *
   * @param {number} count - The number of elements to skip.
   * @returns {IterableWrapper<T>} - A new IterableWrapper instance with elements skipped.
   *
   * @example
   * const collection1 = [1, 2, 3, 4, 5];
   * const skipped1 = intoIterable(collection1).skip(3);
   * console.log([...skipped1]); // Output: [4, 5]
   */
  skip(count: number): IterableWrapper<T> {
    const iter = this.iterator;
    const skipIterable = createSkipIterable(iter, count);
    const iterableWrapper = IterableWrapper.new(skipIterable);
    return iterableWrapper;
  }

  /**
   * Zips the elements of the iterable with another iterable or iterator, yielding pairs of corresponding elements.
   * Stops yielding values as soon as one of the iterators is fully consumed.
   *
   * @template U
   * @param {Iterator<U>} other - The iterator or iterable to zip with.
   * @returns {IterableWrapper<[T, U]>} - A new IterableWrapper instance containing pairs of corresponding elements.
   *
   * @example
   * const collection1 = [1, 2, 3];
   * const collection2 = ['a', 'b'];
   *
   * // Create an IterableWrapper for collection1
   * const iterable1 = intoIterable(collection1);
   *
   * // Zip collection1 with collection2
   * const zippedIterable = iterable1.zip(collection2[Symbol.iterator]());
   *
   * // Iterate over the zipped iterable
   * for (const pair of zippedIterable) {
   *   console.log(pair); // Output: [1, 'a'], [2, 'b']
   * }
   */
  zip<U>(other: Iterator<U>): Iterable<[T, U]> {
    const iter = this.iterator;
    const zipIterable = createZipIterable(iter, other);
    const iterableWrapper = IterableWrapper.new(zipIterable);
    return iterableWrapper;
  }

  /**
   * Zips the elements of the current iterable with elements from multiple other iterables,
   * continuing until all iterables are consumed.
   *
   * @param {...Iterator<any>[]} iterables - Other iterables to zip with the current iterable.
   * @returns {Iterable<any[]>} - An iterable producing arrays of zipped elements from all iterables.
   *
   * @template T
   * @memberof IterableWrapper
   *
   * @example
   * const collection = [1, 2, 3, 4, 5];
   * const baseIter = intoIterable(collection);
   *
   * // Define other iterables to zip with baseIter
   * const otherIter1 = intoIterable(collection).map((x: number) => x + 1);
   * const otherIter2 = intoIterable(collection).enumerate();
   * const otherIter3 = intoIterable(collection).take(3);
   *
   * // Zip all iterables together
   * const zippedIterable = baseIter.zipAll(otherIter1, otherIter2, otherIter3);
   *
   * // Convert to iterator and check each result
   * const iterator = zippedIterable[Symbol.iterator]();
   * console.log(iterator.next()); // Output: { done: false, value: [1, 2, [0, 1], 1] }
   * console.log(iterator.next()); // Output: { done: false, value: [2, 3, [1, 2], 2] }
   * console.log(iterator.next()); // Output: { done: false, value: [3, 4, [2, 3], 3] }
   * console.log(iterator.next()); // Output: { done: true, value: undefined }
   */
  zipAll(...iterables: Iterator<any>[]): Iterable<any[]> {
    const iter = this.iterator;
    const zipAllIterable = createZipAllIterable(iter, ...iterables);
    const iterableWrapper = IterableWrapper.new(zipAllIterable);
    return iterableWrapper;
  }

  /**
   * Creates an iterable that cycles through the elements of the original iterable indefinitely.
   *
   * @returns {IterableWrapper<T>} An iterable wrapper that provides methods for iterating and chaining operations.
   *
   * @example
   * // Example 1: Using `cycle` with `map` to double each element and then `take(6)` to limit the iteration.
   * const collection = [1, 2, 3];
   * const cycle = intoIterable(collection).cycle();
   * const iter = cycle[Symbol.iterator]();
   * console.log(iter.next()); // { done: false, value: 1 }
   * console.log(iter.next()); // { done: false, value: 2 }
   * console.log(iter.next()); // { done: false, value: 3 }
   * console.log(iter.next()); // { done: false, value: 1 }
   * console.log(iter.next()); // { done: false, value: 2 }
   *
   * // Example 2: Using 'cycle' with 'take' to take first 6 elements
   * const collection = [1, 2, 3];
   * const cycle = intoIterable(collection).cycle().take(6);
   * const result = Array.from(cycle);
   * console.log(result); // [ 1, 2, 3, 1, 2, 3 ]
   *
   * // Example 3: Using `cycle` with `filter` to keep only even numbers and then `take(6)` to limit the iteration.
   * const collection = [1, 2, 3, 4, 5];
   * const chained2 = intoIterable(collection2)
   *  .cycle()
   *  .filter((x) => x % 2 === 0)
   *  .take(6);
   *
   * const result = Array.from(chained2);
   * console.log(result); // [2, 4, 2, 4, 2, 4]
   */
  cycle() {
    const iter = this.iterator;
    const cycleIterable = createCycleIterable(iter);
    const iterableWrapper = IterableWrapper.new(cycleIterable);
    return iterableWrapper;
  }
}

export default IterableWrapper;
