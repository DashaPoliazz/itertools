import Collector from "./Collector";

class ArrayCollector<T> implements Collector<T, T[]> {
  collect(iterable: Iterable<T>): T[] {
    return Array.from(iterable);
  }
}

export default ArrayCollector;
