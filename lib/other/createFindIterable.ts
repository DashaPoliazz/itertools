type Predicate<T> = (item: T) => boolean;

function createFindIterable<T>(
  iterator: Iterator<T>,
  predicate: Predicate<T>,
): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      let found = false;
      return {
        next() {
          let current = iterator.next();
          if (current.done || found) {
            return { done: true, value: undefined };
          }
          while (!current.done) {
            const value = current.value;
            if (predicate(value)) {
              found = true;
              return { done: false, value };
            }
            current = iterator.next();
          }
          return { done: true, value: undefined };
        },
      };
    },
  };
}

export default createFindIterable;
