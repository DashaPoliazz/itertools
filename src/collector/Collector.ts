interface Collector<T, C> {
  collect(iterable: Iterable<T>): C;
}

export default Collector;
