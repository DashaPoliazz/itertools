type Classifier<T, K> = (item: T) => K;

function createGroupBy<T, K>(
  iterable: Iterable<T>,
  classifier: Classifier<T, K>,
): Iterable<{ key: K; items: T[] }> {
  const groups = new Map<K, T[]>();

  for (const item of iterable) {
    const key = classifier(item);
    if (groups.has(key)) {
      groups.get(key)!.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  const entries = groups.entries();

  return {
    [Symbol.iterator]() {
      return {
        next() {
          const itemToYield = entries.next();
          if (itemToYield.done) return itemToYield;
          const [key, value] = itemToYield.value;
          return { done: false, value: { key, items: value } };
        },
      };
    },
  };
}

export default createGroupBy;
