type FilterFn<T> = (item: T) => boolean;

function filter<T>(iter: Iterator<T>, fn: FilterFn<T>): Iterable<T> {
  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          let { value, done } = iter.next();
          while (!done) {
            if (fn(value)) return { value, done };
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
