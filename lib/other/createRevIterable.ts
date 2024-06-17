function createRevIterable<T>(collection: T[]): Iterable<T> {
  return {
    [Symbol.iterator]() {
      let idx = collection.length - 1;
      return {
        next: () => {
          const done = idx < 0;
          const value = collection[idx--];
          return { done, value };
        },
      };
    },
  };
}

export default createRevIterable;
