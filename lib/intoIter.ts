// Todo:
// [] Should be able to take not only iterable, but 'any' and try to cast it
// to iterable
import IterableWrapper from "./ItearbleWrapper";

function intoIterable<T>(iterable: Iterable<T>): IterableWrapper<T> {
  return IterableWrapper.new(iterable);
}

export default intoIterable;
