type FilterFn<T> = (item: T) => boolean;
type MapFn<T, U> = (item: T) => U;

function filter<T, U>(
  iter: Iterator<T>,
  filterFn: FilterFn<T>,
  mapFn: MapFn<T, U>,
): Iterable<U> {
  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          let { value, done } = iter.next();
          while (!done) {
            if (filterFn(value)) return { value: mapFn(value), done };
            const { value: innerValue, done: innerDone } = iter.next();
            value = innerValue;
            done = innerDone;
          }
          return { value: undefined, done: true };
        },
      };
    },
  };
}

export default filter;
