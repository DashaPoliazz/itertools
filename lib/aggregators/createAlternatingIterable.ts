function createAlternatingIterable<T, K>(
  base: Iterator<T>,
  other: Iterator<K>,
): Iterable<T | K> {
  return {
    [Symbol.iterator]() {
      let baseIter = base.next();
      let otherIter = other.next();
      let isBase = baseIter.done ? false : true;

      return {
        next: () => {
          while (!baseIter.done && isBase) {
            const out = baseIter;
            baseIter = base.next();
            if (!otherIter.done) isBase = false;
            return out;
          }

          while (!otherIter.done && !isBase) {
            const out = otherIter;
            otherIter = other.next();
            if (!baseIter.done) isBase = true;
            return out;
          }

          return { done: true, value: undefined };
        },
      };
    },
  };
}

export default createAlternatingIterable;
