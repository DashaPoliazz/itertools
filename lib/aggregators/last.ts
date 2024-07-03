function last<T>(iter: Iterator<T>): T | null {
  let prev: T | null = null;
  let current = iter.next();
  while (!current.done) {
    prev = current.value;
    current = iter.next();
  }
  return prev;
}

export default last;
