import intoIterable from "./intoIter";
import Iter from "./iter";

// {
//   // Modifiers
//   const iterable = [1, 2, 3, 4, 5];
//   const iter = intoIterable(iterable)
//     .map((x) => x * 2)
//     .map((x) => x + 1);

//   console.log(iter.next());
// }

{
  // Modifiers + Modifiers
  const iterable = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const iter = intoIterable(iterable)
    .filter((x) => x > 4)
    .map((x) => x + 100)
    .take(2)
    .sum();

  console.log(iter);

  // console.log(iter.next());
  // console.log(iter.next());
  // console.log(iter.next());
  // console.log(iter.next());
  // console.log(iter.next());
}

// {
//   // Producers
//   const repeatFiveThreeTimes = Iter.RepeatN(5, 3);
//   console.log(repeatFiveThreeTimes.next());
//   console.log(repeatFiveThreeTimes.next());
//   console.log(repeatFiveThreeTimes.next());
//   console.log(repeatFiveThreeTimes.next());
//   console.log(repeatFiveThreeTimes.next());
// }
// {
//   // Producers + Modifiers
//   const repeatFiveFiveTimes = Iter.RepeatN(5, 5);
//   const mappedRepeat = repeatFiveFiveTimes.map((x) => x + 1);

//   for (let i = 0; i < 6; i++) {
//     console.log("repeat five five times:", mappedRepeat.next());
//   }
// }
// {
//   // Aggregators
//   const repeatFiveFiveTimes = Iter.RepeatN(1, 5);
//   console.log("CTX", repeatFiveFiveTimes.sum());
// }
// {
//   const iterable1 = [1, 2, 3, 4, 5];
//   const collectAsSet: Set<number> = intoIterable(iterable1).collect(); // expexted { 1, 2, 3, 4, 5 };

//   const iterable2 = [6, 7, 8, 9, 10];
//   const collectAsArray = intoIterable(iterable2).collect<Set<number>>(); // expected [6, 7, 8, 9, 10];
// }

// {
//   function x<T>() {
//     return {} as T & (T extends { foo: number } ? { foo: 42 } : { foo: "42" });
//   }

//   const n: { foo: number } = x();
//   const s: { foo: string } = x();
//   console.log("N", n, "S", s);
// }
