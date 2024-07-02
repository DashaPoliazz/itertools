type Predicate<T> = (item: T) => boolean;

function createPartitionIterable<T>(
  iterable: Iterable<T>,
  predicate: Predicate<T>,
): T[][] {
  const passed: T[] = [];
  const notPassed: T[] = [];

  for (const item of iterable) {
    predicate(item) ? passed.push(item) : notPassed.push(item);
  }

  return [passed, notPassed];
}

export default createPartitionIterable;
