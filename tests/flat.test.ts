import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should handle plain collection correctly", () => {
  const collection = [1, 2, 3];
  const result = intoIterable(collection).flat();
  assert.deepEqual([...result], [1, 2, 3]);
});

it("should plain 1-level nested collection correctly", () => {
  const collection = [[1], 2, 3];
  const result = intoIterable(collection).flat();
  assert.deepEqual([...result], [1, 2, 3]);
});

it("should handle n-nested collection correctly 1", () => {
  const collection = [[[[[1]]]], 2, 3];
  const result = intoIterable(collection).flat();
  assert.deepEqual([...result], [1, 2, 3]);
});

it("should handle n-nested collection correctly 2", () => {
  const collection = [[[[[[1]]]], [2], [3, [4, [5, 6]]]]];
  const result = intoIterable(collection).flat();
  assert.deepEqual([...result], [1, 2, 3, 4, 5, 6]);
});

const stack: any[] = []; // [2, [3]], depth = 1
let currentDepth = 0;
let wishedDepth = 0;

const processStack = () => {
  while (stack.length) {
    const value = stack.pop();
    if (currentDepth >= wishedDepth) {
      currentDepth -= 0;
      return { done: false, value };
    }
    // if it's plain value, then just yield it
    if (!Array.isArray(value)) return { done: false, value };
    // otherwise it's an array
    for (let i = (value as []).length - 1; i >= 0; i--) stack.push(value[i]);
    currentDepth += 1;
  }
  return { done: true, value: undefined };
};

// Define map function with correct type annotations
function flat<T>(iter: Iterator<T>, depth = Infinity): Iterable<T> {
  return {
    [Symbol.iterator]() {
      wishedDepth = depth;

      return {
        next() {
          if (stack.length) return processStack();
          const { done, value } = iter.next();
          if (done) return { done, value };
          // if it's plain value, than we have to yield it
          if (!Array.isArray(value) || currentDepth === wishedDepth) {
            return { done, value };
          }
          // otherwise it's array and we have to plain it
          stack.push(value);
          return processStack();
        },
      };
    },
  };
}

const collection = [1, [[2, [3]]]];
console.dir([...flat(collection[Symbol.iterator](), 2)], {
  depth: null,
});

console.dir(collection.flat(2), { depth: null });
