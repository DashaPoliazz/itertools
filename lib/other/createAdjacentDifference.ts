function createAdjacentDifference(
  iterator: Iterator<number>,
): Iterable<number> {
  return {
    [Symbol.iterator]() {
      let prev;
      let first = true;

      return {
        next() {
          const current = iterator.next();
          if (current.done) {
            return { done: true, value: undefined };
          }

          if (first) {
            first = false;
            prev = current.value;
            return { done: false, value: current.value };
          }

          const diff = current.value - prev!;
          prev = current.value;
          return { done: false, value: diff };
        },
      };
    },
  };
}

export default createAdjacentDifference;
