function count(iter: Iterable<any>): number {
  let count = 0;
  for (const _ of iter) count++;
  return count;
}

export default count;
