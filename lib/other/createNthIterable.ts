function createNthIterable<T>(iterator: Iterator<T>, n: number): Iterable<T> {
  return {
    [Symbol.iterator]() {
      let counter = 0;
      let found = false;
      return {
        next() {
          if (found) return { done: true, value: undefined };
          let current = iterator.next();
          if (current.done) return current;
          while (!current.done) {
            if (counter === n) {
              counter = 0;
              found = true;
              return current;
            }
            counter++;
            current = iterator.next();
          }

          return { done: true, value: undefined };
        },
      };
    },
  };
}

export default createNthIterable;
