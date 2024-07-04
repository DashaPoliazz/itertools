function withoutComparator<T>(
  base: Iterator<T>,
  other: Iterator<T>,
): Iterable<T> {
  let baseIter = base.next();
  let otherIter = other.next();
  let yieldBase = true;

  return {
    [Symbol.iterator]() {
      return {
        next() {
          if (baseIter.done && otherIter.done)
            return { done: true, value: undefined };

          if (!baseIter.done && otherIter.done) {
            const value = baseIter.value;
            baseIter = base.next();
            return { value, done: false };
          }

          if (!otherIter.done && baseIter.done) {
            const value = otherIter.value;
            otherIter = other.next();
            return { value, done: false };
          }

          if (yieldBase) {
            yieldBase = false;
            const value = baseIter.value;
            baseIter = base.next();
            return { value, done: false };
          } else {
            yieldBase = true;
            const value = otherIter.value;
            otherIter = other.next();
            return { value, done: false };
          }
        },
      };
    },
  };
}

// -1 -> base > other
// 0 => equal
// 1 => other > base
function withComparator<T>(
  base: Iterator<T>,
  other: Iterator<T>,
  comparator: (a: T, b: T) => number,
): Iterable<T> {
  let baseIter = base.next();
  let otherIter = other.next();

  return {
    [Symbol.iterator]() {
      return {
        next() {
          if (baseIter.done && otherIter.done)
            return { done: true, value: undefined };

          if (!baseIter.done && otherIter.done) {
            const value = baseIter.value;
            baseIter = base.next();
            return { value, done: false };
          }

          if (!otherIter.done && baseIter.done) {
            const value = otherIter.value;
            otherIter = other.next();
            return { value, done: false };
          }

          // Use comparator to determine order
          const comparisonResult = comparator(baseIter.value, otherIter.value);
          let value;
          if (comparisonResult <= 0) {
            value = baseIter.value;
            baseIter = base.next();
          } else {
            value = otherIter.value;
            otherIter = other.next();
          }
          return { value, done: false };
        },
      };
    },
  };
}

export default <T>(
  base: Iterator<T>,
  other: Iterator<T>,
  comparator?: (a: T, b: T) => number,
) =>
  comparator
    ? withComparator(base, other, comparator)
    : withoutComparator(base, other);
