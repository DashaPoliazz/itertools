function createLinesIterable(
  iterator: Iterator<string>,
  delimiter = "\n",
): Iterable<string> {
  let buffer: string[] = [];

  return {
    [Symbol.iterator]() {
      return {
        next() {
          let iter = iterator.next();
          while (!iter.done) {
            buffer.push(iter.value);

            // Check if buffer ends with the delimiter
            if (buffer.slice(-delimiter.length).join("") === delimiter) {
              // Remove the delimiter from the end of buffer
              const resultLine = buffer
                .slice(0, -delimiter.length)
                .join("")
                .trim();
              buffer = []; // Reset buffer for the next line

              // Return the trimmed line if it's not empty
              if (resultLine !== "") {
                return { done: false, value: resultLine };
              }
            }

            iter = iterator.next();
          }

          // Handle end of iterator
          if (buffer.length > 0) {
            // Trim the entire buffer to handle trailing whitespace lines
            const resultLine = buffer.join("").trim();
            buffer = []; // Reset buffer
            if (resultLine !== "") {
              return { done: false, value: resultLine };
            }
          }

          return { done: true, value: undefined };
        },
      };
    },
  };
}

export default createLinesIterable;
