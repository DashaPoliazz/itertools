function createTupleMapIterable<T, U>(
  iterator: Iterator<[T, T]>,
  map: (tuple: [T, T]) => [U, U],
): Iterable<[U, U]> {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          const { value, done } = iterator.next();
          if (done) return { done: true, value: undefined };
          return { done: false, value: map(value) };
        },
      };
    },
  };
}

export default createTupleMapIterable;
