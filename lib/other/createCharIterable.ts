function createCharIterable(iter: Iterator<string>): Iterable<string> {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          const result = iter.next();
          if (!result.done) {
            return { done: false, value: result.value };
          } else {
            return { done: true, value: undefined };
          }
        },
      };
    },
  };
}

export default createCharIterable;
