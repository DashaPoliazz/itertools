function createEnumerateIterable<T>(iter: Iterator<T>): Iterable<[number, T]> {
  return {
    [Symbol.iterator]() {
      let idx = 0;
      return {
        next: (): IteratorResult<[number, T]> => {
          const { done, value } = iter.next();
          return done
            ? { done: true, value: undefined as any }
            : { done: false, value: [idx++, value] };
        },
      };
    },
  };
}

export default createEnumerateIterable;
