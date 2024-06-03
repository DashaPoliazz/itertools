import createMapIterable from "./modifiers/createMapIterable";
import sum from "./aggregators/sum";

type MapFn<T, U> = (item: T) => U;

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
    const out = sum(this.iterable);
    return out;
  }
}

export default IterableWrapper;
