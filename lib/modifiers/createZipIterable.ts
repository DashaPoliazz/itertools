function createZipIterable<T, U>(
  iter: Iterator<T>,
  zipWith: Iterator<U>,
): Iterable<[T, U]> {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          const iterResult = iter.next();
          const zipWithResult = zipWith.next();

          if (iterResult.done || zipWithResult.done) {
            return { done: true, value: undefined };
          }

          return {
            done: false,
            value: [iterResult.value, zipWithResult.value],
          };
        },
      };
    },
  };
}
export default createZipIterable;
