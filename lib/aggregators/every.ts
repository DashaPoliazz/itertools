type Predicate<T> = (item: T) => boolean;

function every<T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean {
  for (const item of iterable) {
    if (!predicate(item)) {
      return false;
    }
  }

  return true;
}

export default every;
