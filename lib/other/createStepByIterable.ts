function createStepByIterable<T>(
  iterator: Iterator<T>,
  n: number,
): Iterable<T> {
  return {
    [Symbol.iterator]() {
      // preventing infinity loops and ub
      if (n <= 0) n = 1;

      let count = 0;
      let iter = iterator.next();

      return {
        next() {
          const { done, value } = iter;
          if (done) return { done, value };
          while (!iter.done && count < n) {
            iter = iterator.next();
            count++;
          }
          count = 0;
          return { done: false, value };
        },
      };
    },
  };
}

export default createStepByIterable;
