function createSkipIterable<T>(iter: Iterator<T>, count: number): Iterable<T> {
  return {
    [Symbol.iterator]() {
      for (let i = 0; i < count; i++) iter.next();

      return {
        next: () => {
          return iter.next();
        },
      };
    },
  };
}

export default createSkipIterable;
