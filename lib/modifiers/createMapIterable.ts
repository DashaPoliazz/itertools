type MapFn<T, U> = (item: T) => U;

// Define map function with correct type annotations
function map<T, U>(iter: Iterator<T>, fn: MapFn<T, U>): Iterable<U> {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          const { done, value } = iter.next();
          return done ? { done, value } : { done: false, value: fn(value!) };
        },
      };
    },
  };
}
export default map;
