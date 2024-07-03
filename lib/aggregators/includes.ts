type Predicate<T> = (item: T) => boolean;

function includes<T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean {
  for (const item of iterable) {
    if (predicate(item)) {
      return true;
    }
  }

  return false;
}

export default includes;
