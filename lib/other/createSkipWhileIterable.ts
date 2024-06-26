function createSkipWhileIterable<T>(
  iterator: Iterator<T>,
  predicate: (item: T) => boolean,
): Iterable<T> {
  let skipped = false;

  return {
    [Symbol.iterator]() {
      return {
        next() {
          let current = iterator.next();

          while (!current.done && predicate(current.value) && !skipped) {
            current = iterator.next();
          }

          if (!skipped && !current.done && !predicate(current.value)) {
            skipped = true;
          }

          return current;
        },
      };
    },
  };
}

export default createSkipWhileIterable;
