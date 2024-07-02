function createBatchIterable<T>(iterator: Iterator<T>, n: number): Iterable<T> {
  return {
    [Symbol.iterator]() {
      let current = iterator.next();
      let pairs: T[] = [];

      return {
        next(): IteratorResult<T[]> {
          if (current.done) {
            if (pairs.length) {
              const out = [...pairs];
              pairs = [];
              return { done: false, value: out };
            }

            return { done: true, value: undefined };
          }

          while (!current.done) {
            if (pairs.length === n) {
              const out = [...pairs];
              pairs = [];
              return { done: false, value: out };
            }

            const value = current.value;
            pairs.push(value);
            current = iterator.next();
          }

          if (pairs.length) {
            const out = [...pairs];
            pairs = [];
            return { done: false, value: out };
          }

          return { done: true, value: undefined };
        },
      };
    },
  };
}

export default createBatchIterable;
