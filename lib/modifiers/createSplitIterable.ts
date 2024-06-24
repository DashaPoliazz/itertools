function createSplitIterable(
  iter: Iterator<string>,
  text: string,
  pattern: string,
): Iterable<string> {
  return {
    [Symbol.iterator]() {
      const splitted = text.split(pattern);
      const iter = splitted[Symbol.iterator]();

      return {
        next() {
          return iter.next();
        },
      };
    },
  };
}

export default createSplitIterable;
