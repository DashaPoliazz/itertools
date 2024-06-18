function createZipAllIterable<T>(
  iter: Iterator<T>,
  ...iterators: Iterator<any>[]
): Iterable<any[]> {
  iterators.unshift(iter);

  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          const mappedIterators = iterators.map((iter) => iter.next());
          const consumedIterator = mappedIterators.find(
            (iter) => iter.done === true,
          );
          if (consumedIterator) return { done: true, value: undefined };
          return {
            done: false,
            value: mappedIterators.map((iter) => iter.value),
          };
        },
      };
    },
  };
}

export default createZipAllIterable;
