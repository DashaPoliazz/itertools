import createMapIterable from "./modifiers/createMapIterable";
import sum from "./aggregators/sum";
import Collectors from "./collector/Collectors";

type MapFn<T, U> = (item: T) => U;

// Определение класса IterableWrapper
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

  // Aggregators
  sum(this: IterableWrapper<number>): number {
    const sumResult = sum(this.iterable);
    return sumResult;
  }

  collect(collectAs: Collectors) {}
}

export default IterableWrapper;
