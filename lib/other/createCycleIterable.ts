function createCycleIterable<T>(iter: Iterator<T>): Iterable<T> {
  const history: T[] = [];
  let finished = false;
  let length = 0;
  let idx = 0;

  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          const { value, done } = iter.next();

          // reseting index
          if (finished && idx >= length) idx = 0;

          // Collecting data on the first iteration
          if (done) {
            if (!finished) {
              finished = true;
              length = idx;
              idx = 0;
            }

            return { done: false, value: history[idx++] };
          } else {
            history.push(value);
            idx++;

            return { done, value };
          }
        },
      };
    },
  };
}

export default createCycleIterable;
