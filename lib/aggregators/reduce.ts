type Reducer<T, R> = (prevValue: R, currentValue: T) => R;

function reduce<T, R>(
  iterable: Iterable<T>,
  reducer: Reducer<T, R>,
  initialValue: R,
): R {
  let accumulator = initialValue;
  for (const item of iterable) {
    accumulator = reducer(accumulator, item);
  }
  return accumulator;
}

export default reduce;
