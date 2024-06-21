import intoIterable from "../intoIter";

const rangeNumber = (
  from: number | bigint,
  to: number | bigint,
  step: number | bigint = typeof from === "bigint" ? 1n : 1,
): Iterable<number | bigint> => ({
  [Symbol.iterator]() {
    return {
      next: () => {
        if (typeof step === "number" && step === 0) {
          step = 1;
        }
        if (typeof step === "bigint" && step === 0n) {
          step = 1n;
        }

        if (step > 0) {
          if (from < to) {
            // from Left to Right increasing order
            const done = from >= to;
            if (done) return { done, value: undefined };
            const value = from;
            from =
              typeof from === "bigint"
                ? BigInt(from) + BigInt(step)
                : (from as number) + (step as number);
            return { done, value };
          } else {
            // from Right to Left decreasing order
            const done = from <= to;
            if (done) return { done, value: undefined };
            const value = from;
            from =
              typeof from === "bigint"
                ? BigInt(from) - BigInt(step)
                : (from as number) - (step as number);
            return { done, value };
          }
        } else {
          // step is negative
          if (from < to) {
            const done = from >= to;
            if (done) return { done, value: undefined };
            const value = from;
            from =
              typeof from === "bigint"
                ? BigInt(from) - BigInt(step)
                : (from as number) - (step as number);
            return { done, value };
          } else {
            // from Left to Right increasing order
            const done = from <= to;
            if (done) return { done, value: undefined };
            const value = from;
            from =
              typeof from === "bigint"
                ? BigInt(from) + BigInt(step)
                : (from as number) + (step as number);
            return { done, value };
          }
        }
      },
    };
  },
});

const rangeString = (
  from: string,
  to: string,
  step: number = 1,
): Iterable<string> => ({
  [Symbol.iterator]() {
    let start = from.charCodeAt(0);
    let end = to.charCodeAt(0);

    return {
      next: () => {
        if (step === 0) step = 1; // Ensure step is not zero

        if (step > 0) {
          if (start < end) {
            // from Left to Right increasing order
            const done = start >= end;
            if (done) return { done, value: undefined };
            const value = String.fromCodePoint(start);
            start += step;
            return { done: false, value };
          } else {
            // from Right to Left decreasing order
            const done = start <= end;
            if (done) return { done, value: undefined };
            const value = String.fromCodePoint(start);
            start -= step;
            return { done: false, value };
          }
        } else {
          // step is negative
          if (start > end) {
            // from Left to Right increasing order
            const done = start <= end;
            if (done) return { done, value: undefined };
            const value = String.fromCodePoint(start);
            start += step;
            return { done: false, value };
          } else {
            // from Right to Left decreasing order
            const done = start >= end;
            if (done) return { done, value: undefined };
            const value = String.fromCodePoint(start);
            start -= step;
            return { done: false, value };
          }
        }
      },
    };
  },
});

/**
 * Returns an iterable object that generates a sequence of numbers, BigInts, or strings,
 * depending on the types of `from` and `to` parameters. If `from` and `to` are strings,
 * the function generates characters based on Unicode code points using `.codePointAt`.
 * Supports surrogate pairs for characters outside the Basic Multilingual Plane (BMP).
 *
 * @param {number | bigint | string} from - The starting value (inclusive).
 * @param {number | bigint | string} to - The ending value (exclusive).
 * @param {number} [step=1] - The step value (default is 1).
 * @returns {Iterable<number | bigint | string>} The iterable sequence.
 *
 * @example
 * // Example usage with numbers 1 to 5
 * const rng1to5 = rangeIterable(1, 5);
 * const iterator1to5 = rng1to5[Symbol.iterator]();
 * console.log(iterator1to5.next().value); // 1
 * console.log(iterator1to5.next().value); // 2
 * console.log(iterator1to5.next().value); // 3
 * console.log(iterator1to5.next().value); // 4
 * console.log(iterator1to5.next().done); // true
 *
 * @example
 * // Example usage with letters 'a' to 'e'
 * const rngAtoE = rangeIterable('a', 'e');
 * const iteratorAtoE = rngAtoE[Symbol.iterator]();
 * console.log(iteratorAtoE.next().value); // 'a'
 * console.log(iteratorAtoE.next().value); // 'b'
 * console.log(iteratorAtoE.next().value); // 'c'
 * console.log(iteratorAtoE.next().value); // 'd'
 * console.log(iteratorAtoE.next().done); // true
 *
 * @example
 * // Example usage with Japanese Hiragana 'ぁ' to 'う'
 * const rngHiragana = rangeIterable('ぁ', 'う'); // Japanese Hiragana
 * const iteratorHiragana = rngHiragana[Symbol.iterator]();
 * console.log(iteratorHiragana.next().value); // 'ぁ'
 * console.log(iteratorHiragana.next().value); // 'あ'
 * console.log(iteratorHiragana.next().value); // 'ぃ'
 * console.log(iteratorHiragana.next().value); // 'い'
 * console.log(iteratorHiragana.next().value); // 'ぅ'
 * console.log(iteratorHiragana.next().done); // true
 */
function rangeIterable(
  from: number | bigint | string,
  to: number | bigint | string,
  step: number = 1,
): Iterable<number | bigint | string> {
  if (typeof from === "number" && typeof to === "number") {
    return intoIterable(rangeNumber(from, to, step));
  } else if (typeof from === "bigint" && typeof to === "bigint") {
    return intoIterable(rangeNumber(BigInt(from), BigInt(to), step));
  } else if (typeof from === "string" && typeof to === "string") {
    return intoIterable(rangeString(from, to, step));
  } else {
    return {
      [Symbol.iterator]() {
        return {
          next: () => ({ done: true, value: undefined }),
        };
      },
    };
  }
}

export default rangeIterable;
