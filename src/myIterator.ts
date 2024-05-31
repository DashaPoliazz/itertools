export function* myIterator(arr: number[]): IterableIterator<number> {
  for (const num of arr) {
    yield num * 2;
  }
}
