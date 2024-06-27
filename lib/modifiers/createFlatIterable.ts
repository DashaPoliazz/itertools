const stack: any[] = [];

const processStack = () => {
  while (stack.length) {
    const value = stack.pop();
    // if it's plain value, then just yield it
    if (!Array.isArray(value)) return { done: false, value };
    // otherwise it's an array
    for (let i = (value as []).length - 1; i >= 0; i--) stack.push(value[i]);
  }
  return { done: true, value: undefined };
};

// Define map function with correct type annotations
function flat<T>(iter: Iterator<T>): Iterable<T> {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          if (stack.length) return processStack();
          const { done, value } = iter.next();
          if (done) return { done, value };
          // if it's plain value, than we have to yield it
          if (!Array.isArray(value)) return { done, value };
          // otherwise it's array and we have to plain it
          for (let i = value.length - 1; i >= 0; i--) stack.push(value[i]);
          return processStack();
        },
      };
    },
  };
}

export default flat;
