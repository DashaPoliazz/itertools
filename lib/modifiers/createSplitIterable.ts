function createSplitIterable(
  iterable: string,
  pattern: string | RegExp,
): Iterable<string> {
  return pattern instanceof RegExp
    ? regexpIterable(iterable, pattern)
    : stringIterable(iterable, pattern);
}

const stringIterable = (
  iterable: string,
  pattern: string,
): Iterable<string> => ({
  [Symbol.iterator]() {
    let start = 0;
    return {
      next(): IteratorResult<string> {
        // Special handling for empty pattern
        if (pattern === "") {
          if (start < iterable.length) {
            return { done: false, value: iterable.charAt(start++) };
          }
          return { done: true, value: undefined };
        }

        const end = iterable.indexOf(pattern, start);
        if (end === -1) {
          if (start <= iterable.length) {
            const value = iterable.substring(start);
            // before done we have to handle case when the pattern is the last char
            start = iterable.length + pattern.length;
            return { done: false, value };
          }
          return { done: true, value: undefined };
        }
        const value = iterable.substring(start, end);
        start = end + pattern.length;
        return { done: false, value };
      },
    };
  },
});

const regexpIterable = (iterable: string, regexp: RegExp): Iterable<string> => {
  const globalRegexp = regexp.global
    ? regexp
    : new RegExp(regexp.source, regexp.flags + "g");

  return {
    [Symbol.iterator]() {
      const iterator = iterable.matchAll(globalRegexp);
      let from = 0;
      return {
        next() {
          const { done, value } = iterator.next();
          if (done) {
            if (from < iterable.length) {
              const value = iterable.substring(from);
              from = iterable.length;
              return { done: false, value };
            }
            return { done: true, value: undefined };
          }
          const [substring] = value;
          const index = value.index as number;
          const slicedString = iterable.slice(from, index);
          from = index + substring.length;
          return { done: false, value: slicedString };
        },
      };
    },
  };
};

export default createSplitIterable;
