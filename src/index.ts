import intoIterable from "./intoIter";
import Iter from "./iter";

{
  // Modifiers
  const iterable = [1, 2, 3, 4, 5];
  const iter = intoIterable(iterable)
    .map((x) => x * 2)
    .map((x) => x + 1);

  console.log(iter.next());
}
{
  // Producers
  const repeatFiveThreeTimes = Iter.RepeatN(5, 3);
  console.log(repeatFiveThreeTimes.next());
  console.log(repeatFiveThreeTimes.next());
  console.log(repeatFiveThreeTimes.next());
  console.log(repeatFiveThreeTimes.next());
  console.log(repeatFiveThreeTimes.next());
}
{
  // Producers + Modifiers
  const repeatFiveFiveTimes = Iter.RepeatN(5, 5);
  const mappedRepeat = repeatFiveFiveTimes.map((x) => x + 1);

  for (let i = 0; i < 6; i++) {
    console.log("repeat five five times:", mappedRepeat.next());
  }
}
{
  // Aggregators
  const repeatFiveFiveTimes = Iter.RepeatN(1, 5);
  console.log("CTX", repeatFiveFiveTimes.sum());
}
