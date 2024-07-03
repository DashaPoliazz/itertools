function createChunkIterable<T>(
  iter: Iterator<T>,
  size: number,
): Iterable<T[]> {
  return {
    [Symbol.iterator]() {
      // preventing ub
      if (size < 0) size = 0;

      let count = 0;
      let iterator = iter.next();

      return {
        next() {
          const { value, done } = iterator;
          if (done) return { value, done };

          // preventing infinity loop
          if (size === 0) {
            return { value: undefined, done: true };
          }

          const chunk: T[] = [];
          while (count < size && !iterator.done) {
            chunk.push(iterator.value);
            iterator = iter.next();
            count++;
          }
          count = 0;
          return { done: false, value: chunk };
        },
      };
    },
  };
}

export default createChunkIterable;
