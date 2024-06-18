type ForEachCb<T> = (item: T) => void;

function createForEachIterable<T>(
  iter: Iterator<T>,
  cb: ForEachCb<T>,
): Iterable<T> {
  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          const { value, done } = iter.next();
          if (done) return { value, done };
          cb(value);
          return { value, done };
        },
      };
    },
  };
}

export default createForEachIterable;
