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
import createFilterMapIterable from "./modifiers/createFilterMapIterable";
// import createCharIterable from "./other/createCharIterable";
import createSplitIterable from "./modifiers/createSplitIterable";
import createAdjacentDifference from "./other/createAdjacentDifference";
import crateIsliceIterable from "./other/createIsliceIterable";
import createTupleMapIterable from "./modifiers/createTupleMapIterable";
import createUniqueIterable from "./other/createUniqueIterable";
import createSkipWhileIterable from "./other/createSkipWhileIterable";
import createLinesIterable from "./other/createLinesIterable";
import every from "./aggregators/every";

import sum from "./aggregators/sum";
import count from "./aggregators/count";

import once from "../helpers/once";

// import Peekable from "./other/Peekable";

type MapFn<T, U> = (item: T) => U;
type Predicate<T> = (item: T) => boolean;
type ForEachCb<T> = (item: T) => void;
type IterableOfString<T> = Iterable<T extends string ? T : never>;
type Delimiters = "\n" | "\r\n" | "\r" | "\u2028" | "\u2029";

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
   * @param {MapFn<T, U>} transform - The function to apply to each element.
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
  map<U>(transform: MapFn<T, U>): IterableWrapper<U> {
    const iter = this.iterator;
    const mapIterable = createMapIterable(iter, transform);
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
  zip<U>(other: Iterator<U>): IterableWrapper<[T, U]> {
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
  zipAll(...iterables: Iterator<any>[]): IterableWrapper<any[]> {
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
  cycle(): IterableWrapper<T> {
    const iter = this.iterator;
    const cycleIterable = createCycleIterable(iter);
    const iterableWrapper = IterableWrapper.new(cycleIterable);
    return iterableWrapper;
  }

  /**
   * Filters the elements of the iterable using the provided predicate function
   * and maps the filtered elements using the provided transform function.
   *
   * @template U
   * @param {Predicate<T>} predicate - The predicate function to apply to each element for filtering.
   * @param {MapFn<T, U>} transform - The function to apply to each filtered element for mapping.
   * @returns {Iterable<U>} - A new iterable instance containing the mapped elements.
   *
   * @example
   * // Example 1: Filter even numbers and add one
   * const collection1 = [1, 2, 3, 4, 5];
   * const even = (x: number) => x % 2 === 0;
   * const addOne = (x: number) => x + 1;
   *
   * const iterable1 = intoIterable(collection1);
   * const result1 = iterable1.filterMap(even, addOne);
   * console.log([...result1]); // Output: [3, 5]
   *
   * @example
   * // Example 2: Filter odd numbers and square them
   * const collection2 = [1, 2, 3, 4, 5];
   * const odd = (x: number) => x % 2 !== 0;
   * const square = (x: number) => x * x;
   *
   * const iterable2 = intoIterable(collection2);
   * const result2 = iterable2.filterMap(odd, square);
   * console.log([...result2]); // Output: [1, 9, 25]
   *
   * @example
   * // Example 3: Filter strings containing 'a' and convert to uppercase
   * const collection3 = ["apple", "banana", "cherry", "date"];
   * const containsA = (x: string) => x.includes('a');
   * const toUpperCase = (x: string) => x.toUpperCase();
   *
   * const iterable3 = intoIterable(collection3);
   * const result3 = iterable3.filterMap(containsA, toUpperCase);
   * console.log([...result3]); // Output: ["APPLE", "BANANA", "DATE"]
   */
  filterMap<U>(
    predicate: Predicate<T>,
    transform: MapFn<T, U>,
  ): IterableWrapper<U> {
    const iter = this.iterator;
    const filterMapIterable = createFilterMapIterable(
      iter,
      predicate,
      transform,
    );
    const iterableWrapper = IterableWrapper.new(filterMapIterable);
    return iterableWrapper;
  }

  /**
   * Extracts characters from each string element of the iterable.
   *
   * @returns {IterableWrapper<string>} - A new IterableWrapper instance with characters extracted.
   *
   * @example
   * // Example 1: Using an array of strings
   * const collection1 = ["apple", "banana", "cherry"];
   * const iterable1 = IterableWrapper.new(collection1).chars();
   * console.log([...iterable1]); // Output: ['a', 'p', 'p', 'l', 'e', 'b', 'a', 'n', 'a', 'n', 'a', 'c', 'h', 'e', 'r', 'r', 'y']
   *
   * @example
   * // Example 2: Using a string
   * const collection2 = "hello";
   * const iterable2 = IterableWrapper.new(collection2).chars();
   * console.log([...iterable2]); // Output: ['h', 'e', 'l', 'l', 'o']
   */
  chars(this: IterableWrapper<string>): IterableWrapper<string> {
    // If the original iterable is an array or set of strings
    if (Array.isArray(this.iterable) || this.iterable instanceof Set) {
      // Flatten the array or set into an array of strings
      const flatArray = Array.from(this.iterable).flatMap((item) =>
        typeof item === "string" ? Array.from(item) : [],
      );
      return IterableWrapper.new(flatArray);
    } else {
      // Assume it's an iterable of strings
      return IterableWrapper.new(this.iterable as IterableOfString<T>);
    }
  }

  /**
   * Splits the string in the IterableWrapper using the specified pattern.
   *
   * The pattern can be a string or a regular expression. If a string is used,
   * the string will be split at each occurrence of the pattern. If a regular
   * expression is used, the string will be split at each match of the regular
   * expression.
   *
   * @param {string | RegExp} pattern - The pattern to split the string by. This can be
   * a string or a regular expression.
   * @returns {IterableWrapper<string>} An IterableWrapper containing the parts of the
   * string that were separated by the pattern.
   *
   * @example
   * const wrapper = new IterableWrapper("apple,orange,banana");
   * const result = wrapper.split(",");
   * console.log([...result]); // Output: ["apple", "orange", "banana"]
   *
   * @example
   * const wrapper = new IterableWrapper("one1two2three3four");
   * const result = wrapper.split(/\d/);
   * console.log([...result]); // Output: ["one", "two", "three", "four"]
   *
   * @example
   * const wrapper = new IterableWrapper("some text | another part");
   * const result = wrapper.split("|");
   * console.log([...result]); // Output: ["some text ", " another part"]
   */
  split(
    this: IterableWrapper<string>,
    pattern: string | RegExp,
  ): IterableWrapper<string> {
    const iterable = this.iterable;
    const splitIterable = createSplitIterable(iterable as string, pattern);
    const iterableWrapper = IterableWrapper.new(splitIterable);
    return iterableWrapper;
  }

  /**
   * Computes the adjacent differences of the elements in the collection.
   * @this IterableWrapper<number>
   * @returns {IterableWrapper<number>} An IterableWrapper containing the adjacent differences.
   * @example
   * // Example: Computes adjacent differences for a collection of positive numbers
   * const collection1 = [1, 5, 8];
   * const iterableWrapper1 = intoIterable(collection1);
   * const differences1 = iterableWrapper1.adjacentDifference();
   * // differences1 now contains [1, 4, 3]
   *
   */
  adjacentDifference(this: IterableWrapper<number>): IterableWrapper<number> {
    const iter = this.iterator;
    const adjacentDifferenceIterable = createAdjacentDifference(iter);
    const iterableWrapper = IterableWrapper.new(adjacentDifferenceIterable);
    return iterableWrapper;
  }

  /**
   * Returns a new iterable containing elements from `from` (inclusive) to `to` (exclusive).
   *
   * @this {IterableWrapper<T>} The current instance of IterableWrapper.
   * @param {number} from The starting index (inclusive) or negative index from the end of the iterable.
   * @param {number} to The ending index (exclusive) or negative index from the end of the iterable.
   * @returns {IterableWrapper<T>} A new IterableWrapper instance representing the sliced elements.
   * @template T
   *
   * @example
   * const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   * const iterableWrapper = intoIterable(collection);
   * const sliced = iterableWrapper.islice(0, 5);
   *
   * console.log(sliced.next()); // { value: 1, done: false }
   * console.log(sliced.next()); // { value: 2, done: false }
   * console.log(sliced.next()); // { value: 3, done: false }
   * console.log(sliced.next()); // { value: 4, done: false }
   * console.log(sliced.next()); // { value: 5, done: false }
   * console.log(sliced.next()); // { value: undefined, done: true }
   *
   * @example
   * const collection2 = [1, 2, 3];
   * const iterableWrapper2 = intoIterable(collection2);
   * const sliced2 = iterableWrapper2.islice(1, 10);
   *
   * console.log(sliced2.next()); // { value: 2, done: false }
   * console.log(sliced2.next()); // { value: 3, done: false }
   * console.log(sliced2.next()); // { value: undefined, done: true }
   */
  islice(from: number, to: number): IterableWrapper<T> {
    const iter = this.iterator;
    const isliceIterable = crateIsliceIterable(iter, from, to);
    const iterableWrapper = IterableWrapper.new(isliceIterable);
    return iterableWrapper;
  }

  /**
   * Applies a given transformation function to each tuple (pair) in the iterable.
   *
   * @template U
   * @param {IterableWrapper<[U, U]>} this - The iterable wrapper containing tuples.
   * @param {(tuple: [U, U]) => [U, U]} transform - The transformation function to apply to each tuple.
   * @returns {IterableWrapper<[U, U]>} A new IterableWrapper containing the transformed tuples.
   *
   * @example
   * // Example 1: Add one to each element in the tuples
   * const collection1 = new IterableWrapper([
   *   [1, 2],
   *   [3, 4],
   *   [5, 6],
   * ]);
   * const addOne = (tuple) => [tuple[0] + 1, tuple[1] + 1];
   * const result1 = collection1.tupleMap(addOne);
   * console.log([...result1]); // [[2, 3], [4, 5], [6, 7]]
   */
  tupleMap<U>(
    this: IterableWrapper<U[]>,
    transform: (tuple: [U, U]) => [U, U],
  ): IterableWrapper<[U, U]> {
    const iter = this.iterator;
    const tupleMapIterable = createTupleMapIterable(
      iter as Iterator<[U, U]>,
      transform,
    );
    return new IterableWrapper(tupleMapIterable);
  }

  /**
   * Wraps an iterator to yield only unique values.
   *
   * @returns {IterableWrapper<T>} A new IterableWrapper instance that yields unique values from the original iterator.
   *
   * @example
   * // Create a collection with duplicate values
   * const collection = [1, 2, 3, 1, 2, 3, 1, 2, 3];
   *
   * // Wrap the collection into an IterableWrapper
   * const iterableWrapper = intoIterable(collection);
   *
   * // Get the unique iterator
   * const uniqueIterable = iterableWrapper.unique();
   *
   * // Convert the unique iterator to an array and log it
   * console.log([...uniqueIterable]); // Output: [1, 2, 3]
   */
  unique(): IterableWrapper<T> {
    const iter = this.iterator;
    const uniqueIterable = createUniqueIterable(iter);
    return new IterableWrapper(uniqueIterable);
  }

  /**
   * Skips elements in the iterable until the predicate returns false.
   * Once the predicate returns false or the iterator ends, stops skipping elements.
   * Returns a new IterableWrapper instance with the remaining elements.
   *
   * @param {Predicate<T>} predicate - The predicate function that determines whether to skip an element.
   * @returns {IterableWrapper<T>} A new IterableWrapper instance containing the remaining elements after skipping.
   *
   * @example
   * // Create a collection with numbers
   * const collection = [1, 2, 3, 4, 5];
   *
   * // Wrap the collection into an IterableWrapper
   * const iterableWrapper = intoIterable(collection);
   *
   * // Skip elements less than or equal to 2
   * const resultIterable = iterableWrapper.skipWhile((n) => n <= 2);
   *
   * // Convert the result iterable to an array and log it
   * console.log([...resultIterable]); // Output: [3, 4, 5]
   */
  skipWhile(predicate: Predicate<T>): IterableWrapper<T> {
    const iter = this.iterator;
    const skipWhileIterable = createSkipWhileIterable(iter, predicate);
    return new IterableWrapper(skipWhileIterable);
  }

  /**
   * Returns an iterable wrapper that iterates over lines of text from the underlying iterator.
   * Each line is trimmed of leading and trailing whitespace by default.
   *
   * @param {string} ["\n" | "\r\n" | "\r" | "\u2028" | "\u2029"] The delimiter used to separate lines.
   * @returns {IterableWrapper<string>} An iterable wrapper object that provides access to trimmed lines.
   * @example
   * // Basic usage with default newline delimiter
   * const text = "  line1  \n  line2  \n  ";
   * const iterable = intoIterable(text).lines();
   * const result = [...iterable]; // ['line1', 'line2']
   *
   * @example
   * // Custom delimiter example (CRLF)
   * const text = "line1\r\nline2\r\nline3\r\n";
   * const iterable = intoIterable(text).lines("\r\n");
   * const result = [...iterable]; // ['line1', 'line2', 'line3']
   */
  lines(
    this: IterableWrapper<string>,
    delimiter: Delimiters = "\n",
  ): IterableWrapper<string> {
    const iter = this.iterator;
    const linesIterable = createLinesIterable(iter, delimiter);
    return new IterableWrapper(linesIterable);
  }

  /**
   * Checks if every element in the iterable satisfies the provided predicate function.
   *
   * @template T The type of elements in the iterable.
   * @param {Predicate<T>} predicate A function that tests each element in the iterable. Returns true if the element passes the test, false otherwise.
   * @returns {boolean} true if all elements in the iterable satisfy the predicate, false otherwise.
   *
   * @example
   * const collection = [1, 2, 3, 4, 5];
   * const isGreaterThanZero = (item) => item > 0;
   * const result = intoIterable(collection).every(isGreaterThanZero);
   * console.log(result); // Output: true
   *
   * @example
   * const collection = [1, 2, 3, 4, 5];
   * const isEven = (item) => item % 2 === 0;
   * const result = intoIterable(collection).every(isEven);
   * console.log(result); // Output: false
   *
   * @example
   * const emptyCollection: number[] = [];
   * const isGreaterThanZero = (item) => item > 0;
   * const result = intoIterable(emptyCollection).every(isGreaterThanZero);
   * console.log(result); // Output: true
   */
  every(predicate: Predicate<T>): boolean {
    return every(this.iterable, predicate);
  }
}

export default IterableWrapper;
