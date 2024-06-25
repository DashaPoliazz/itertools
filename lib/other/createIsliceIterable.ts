function createIsliceIterable<T>(
  iterator: Iterator<T>,
  from: number,
  to: number,
): Iterable<T> {
  return {
    [Symbol.iterator]() {
      // Normalize from & to

      let idx = 0;

      return {
        next() {
          if (idx >= to || from > to) return { value: undefined, done: true };
          // moving iterator to the from
          while (idx < from) {
            idx += 1;
            iterator.next();
          }

          const { done, value } = iterator.next();
          if (done) return { done, value };

          idx += 1;

          return { value, done };
        },
      };
    },
  };
}

export default createIsliceIterable;
