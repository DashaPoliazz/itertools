function createUniqueIterable<T>(iter: Iterator<T>): Iterable<T> {
  return {
    [Symbol.iterator]() {
      const seen: Set<T> = new Set();

      return {
        next(): IteratorResult<T> {
          while (true) {
            const { done, value } = iter.next();
            if (done) return { done, value };
            if (!seen.has(value)) {
              seen.add(value);
              return { value, done: false };
            }
          }
        },
      };
    },
  };
}

export default createUniqueIterable;
