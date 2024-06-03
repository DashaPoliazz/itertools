function repeatN<T>(itemToRepeat: T, n: number): Iterable<T> {
  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          const done = --n < 0;
          return done
            ? {
                done,
                value: undefined,
              }
            : {
                done,
                value: itemToRepeat,
              };
        },
      };
    },
  };
}

export default repeatN;
