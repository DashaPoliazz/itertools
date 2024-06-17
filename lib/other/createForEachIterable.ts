function createForEachIterable<T>(iter: Iterator<T>): Iterable<T> {
  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          return iter.next();
        },
      };
    },
  };
}

export default createForEachIterable;
