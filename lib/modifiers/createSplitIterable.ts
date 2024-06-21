// if the lenght of pattern is 0, then split it over each char
// if the length of pattern is 1 (could be surrogat pair decoded char)

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
