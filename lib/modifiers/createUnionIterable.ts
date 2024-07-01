function createUnionIterable<T>(
  iter: Iterator<T>,
  other: Iterator<T>,
): Iterable<T> {
  return {
    [Symbol.iterator]() {
      const used = new Set();
      let current = iter.next();
      let switched = false;

      return {
        next() {
          if (current.done) {
            if (!switched) current = other.next();
          }

          while (!current.done) {
            const value = current.value;

            if (!used.has(value)) {
              used.add(value);
              return { done: false, value };
            }

            switched ? (current = other.next()) : (current = iter.next());

            if (current.done && !switched) {
              current = other.next();
              switched = true;
              continue;
            }
          }

          return { done: true, value: undefined };
        },
      };
    },
  };
}

export default createUnionIterable;
