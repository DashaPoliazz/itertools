type ScanClosure<T, S> = (stateRef: { state: S }, item: T) => S | null;

function createScanIterable<T, S>(
  iterator: Iterator<T>,
  initialState: S,
  f: ScanClosure<T, S>,
): Iterable<S> {
  return {
    [Symbol.iterator]() {
      const outerState = { state: initialState };

      return {
        next() {
          const { done, value } = iterator.next();
          if (done) return { done, value };
          const newState = f(outerState, value);
          if (newState === null) return { done: true, value: undefined };
          return { done: false, value: newState };
        },
      };
    },
  };
}

export default createScanIterable;
