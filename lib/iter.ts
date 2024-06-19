import IterableWrapper from "./ItearbleWrapper";
import repeatN from "./producers/repeatN";

class Iter {
  constructor() {}

  static RepeatN<T>(itemToRepeat: T, n: number): IterableWrapper<T> {
    const iterable = repeatN(itemToRepeat, n);
    const iterableWrapper = IterableWrapper.new(iterable);
    return iterableWrapper;
  }
}

export default Iter;
