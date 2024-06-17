function sum(iter: Iterable<number>): number {
  let sum = 0;
  for (const num of iter) sum += num;
  return sum;
}

export default sum;
