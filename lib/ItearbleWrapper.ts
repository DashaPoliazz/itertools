import createMapIterable from "./modifiers/createMapIterable";
import createFilterIterable from "./modifiers/createFilterIterable";
import createTakeIterable from "./other/createTakeIterable";
import createForEachIterable from "./other/createForEachIterable";
import createRevIterable from "./other/createRevIterable";
import createSkipIterable from "./other/createSkipIterable";
import createEnumerateIterable from "./modifiers/createEnumerateIterable";
import sum from "./aggregators/sum";
import count from "./aggregators/count";

type MapFn<T, U> = (item: T) => U;
type FilterFn<T> = (item: T) => boolean;
type Predicate<T> = (item: T) => boolean;

class IterableWrapper<T> {
  iterable: Iterable<T>;
  iterator: Iterator<T>;

  constructor(iterable: Iterable<T>) {
    this.iterable = iterable;
    this.iterator = iterable[Symbol.iterator]();
  }

  static new<T>(iterable: Iterable<T>): IterableWrapper<T> {
    return new IterableWrapper(iterable);
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    return this.iterator.next();
  }

  // Modifiers
  map<U>(fn: MapFn<T, U>): IterableWrapper<U> {
    const iter = this.iterator;
    const mapIterable = createMapIterable(iter, fn);
    const iterableWrapper = IterableWrapper.new(mapIterable);
    return iterableWrapper;
  }

  filter(fn: FilterFn<T>): IterableWrapper<T> {
    const iter = this.iterator;
    const filterIterable = createFilterIterable(iter, fn);
    const iterableWrapper = IterableWrapper.new(filterIterable);
    return iterableWrapper;
  }

  enumerate() {
    const iter = this.iterator;
    const enumerateIterable = createEnumerateIterable(iter);
    const iterableWrapper = IterableWrapper.new(enumerateIterable);
    return iterableWrapper;
  }

  // Aggregators
  sum(this: IterableWrapper<number>): number {
    const sumResult = sum(this.iterable);
    return sumResult;
  }

  count(): number {
    const countResult = count(this.iterable);
    return countResult;
  }

  // Other
  take(n: number): IterableWrapper<T> {
    const iter = this.iterator;
    const takeIterable = createTakeIterable(iter, n);
    const iterableWrapper = IterableWrapper.new(takeIterable);
    return iterableWrapper;
  }

  forEach(): IterableWrapper<T> {
    const iter = this.iterator;
    const forEachIterable = createForEachIterable(iter);
    const iterableWrapper = IterableWrapper.new(forEachIterable);
    return iterableWrapper;
  }

  rev(): IterableWrapper<T> {
    const collection = Array.from(this.iterable);
    const revIterable = createRevIterable(collection);
    const iterableWrapper = IterableWrapper.new(revIterable);
    return iterableWrapper;
  }

  skip(count: number): IterableWrapper<T> {
    const iter = this.iterator;
    const skipIterable = createSkipIterable(iter, count);
    const iterableWrapper = IterableWrapper.new(skipIterable);
    return iterableWrapper;
  }
}

export default IterableWrapper;
