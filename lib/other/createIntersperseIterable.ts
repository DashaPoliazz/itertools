function createIntersperseIterable<T>(
  iter: Iterator<T>,
  element: T,
): Iterable<T> {
  return {
    [Symbol.iterator]() {
      let yieldElement = false;
      let current = iter.next();
      let done = current.done;

      return {
        next() {
          if (done) return { done: true, value: undefined };

          if (yieldElement) {
            yieldElement = false;
            const next = iter.next();
            if (next.done) {
              done = true;
              return { done: true, value: undefined };
            } else {
              current = next;
              return { done: false, value: element };
            }
          }

          yieldElement = true;
          return { done: false, value: current.value };
        },
      };
    },
  };
}

export default createIntersperseIterable;
