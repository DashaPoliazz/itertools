type MapFn<T, U> = (item: T) => U;

function map<T, U>(iter: Iterator<T>, fn: MapFn<T, U>): Iterable<U> {
  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          const { done, value } = iter.next();
          return done ? { done, value } : { done, value: fn(value) };
        },
      };
    },
  };
}

export default map;
