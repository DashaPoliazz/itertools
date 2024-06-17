function createEnumerateIterable<T>(iter: Iterator<T>): Iterable<number> {
  return {
    [Symbol.iterator]() {
      let idx = 0;
      return {
        next: () => {
          const { done } = iter.next();
          return done ? { done, value: undefined } : { done, value: idx++ };
        },
      };
    },
  };
}

export default createEnumerateIterable;
