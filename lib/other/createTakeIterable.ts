function createTakeIterable<T>(iter: Iterator<T>, n: number): Iterable<T> {
  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          const { value, done } = iter.next();
          const doneFlag = n <= 0 || done;
          n -= 1;

          return {
            done: doneFlag,
            value,
          };
        },
      };
    },
  };
}

export default createTakeIterable;
