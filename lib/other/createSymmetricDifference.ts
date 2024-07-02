function createSymmetricDifference<T>(
  base: Iterable<T>,
  other: Iterable<T>,
): Iterable<T> {
  return {
    [Symbol.iterator]() {
      const baseSet = new Set(base);
      const otherSet = new Set(other);
      const seen = new Set();
      const baseIterator = base[Symbol.iterator]();
      const otherIterator = other[Symbol.iterator]();
      let currentBase = baseIterator.next();
      let currentOther = otherIterator.next();

      return {
        next() {
          while (!currentBase.done) {
            const value = currentBase.value;
            currentBase = baseIterator.next();
            if (!otherSet.has(value) && !seen.has(value)) {
              seen.add(value);
              return { done: false, value };
            }
          }

          while (!currentOther.done) {
            const value = currentOther.value;
            currentOther = otherIterator.next();
            if (!baseSet.has(value) && !seen.has(value)) {
              seen.add(value);
              return { done: false, value };
            }
          }

          return { done: true, value: undefined };
        },
      };
    },
  };
}

export default createSymmetricDifference;
