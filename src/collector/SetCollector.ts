import Collector from "./Collector";

class SetCollector<T> implements Collector<T, Set<T>> {
  collect(iterable: Iterable<T>): Set<T> {
    return new Set(iterable);
  }
}

export default SetCollector;
