function createIntersectionIterable<T>(
  iter: Iterator<T>,
  other: Iterable<T>,
): Iterable<T> {
  return {
    [Symbol.iterator]() {
      const lookup = new Set(other);
      const intersections = new Set();
      let current = iter.next();

      return {
        next: () => {
          while (!current.done) {
            const value = current.value;

            if (lookup.has(value) && !intersections.has(value)) {
              intersections.add(value);
              return { done: false, value };
            }

            current = iter.next();
          }

          return { done: true, value: undefined };
        },
      };
    },
  };
}

export default createIntersectionIterable;
