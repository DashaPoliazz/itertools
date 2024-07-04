function createTuplesIterable<T>(iter: Iterator<T>): Iterable<T[]> {
  return {
    [Symbol.iterator]() {
      // preventing ub
      const size = 2;

      let count = 0;
      let iterator = iter.next();

      return {
        next() {
          const { value, done } = iterator;
          if (done) return { value, done };

          const chunk: T[] = [];
          while (count < size && !iterator.done) {
            chunk.push(iterator.value);
            iterator = iter.next();
            count++;
          }
          count = 0;
          if (chunk.length !== size) return { done: true, value: undefined };
          return { done: false, value: chunk };
        },
      };
    },
  };
}

export default createTuplesIterable;
