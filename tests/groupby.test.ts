import { it } from "node:test";
import assert from "assert";
import intoIterable from "../lib/intoIter";

it("should group elements correctly", () => {
  const collection = [
    "apricot",
    "banana",
    "blueberry",
    "apple",
    "cherry",
    "citrus",
  ];
  const byFirstLetter = (word: string) => word[0];
  const groupedByFirstChar = intoIterable(collection).groupBy(byFirstLetter);

  assert.deepEqual(
    [...groupedByFirstChar],
    [
      { key: "a", items: ["apricot", "apple"] },
      { key: "b", items: ["banana", "blueberry"] },
      { key: "c", items: ["cherry", "citrus"] },
    ],
  );
});

it("should handle empty input", () => {
  const collection: string[] = [];
  const byFirstLetter = (word: string) => word[0];
  const groupedByFirstChar = intoIterable(collection).groupBy(byFirstLetter);

  assert.deepEqual([...groupedByFirstChar], []);
});

it("should handle groups with single element", () => {
  const collection = ["apple", "banana", "cherry"];
  const byFirstLetter = (word: string) => word[0];
  const groupedByFirstChar = intoIterable(collection).groupBy(byFirstLetter);

  assert.deepEqual(
    [...groupedByFirstChar],
    [
      { key: "a", items: ["apple"] },
      { key: "b", items: ["banana"] },
      { key: "c", items: ["cherry"] },
    ],
  );
});

it("should group elements by word length", () => {
  const collection = ["apple", "banana", "blueberry", "cherry", "kiwi"];
  const byWordLength = (word: string) => word.length;
  const groupedByWordLength = intoIterable(collection).groupBy(byWordLength);

  assert.deepEqual(
    [...groupedByWordLength],
    [
      { key: 5, items: ["apple"] },
      { key: 6, items: ["banana", "cherry"] },
      { key: 9, items: ["blueberry"] },
      { key: 4, items: ["kiwi"] },
    ],
  );
});

it("should group elements by number of vowels", () => {
  const collection = ["apple", "banana", "blueberry", "cherry", "kiwi"];
  const vowels = ["a", "e", "i", "o", "u", "y"];
  const byNumberOfVowels = (word: string) => {
    let count = 0;
    for (let char of word.toLowerCase()) {
      if (vowels.includes(char)) {
        count++;
      }
    }
    return count;
  };
  const groupedByNumberOfVowels =
    intoIterable(collection).groupBy(byNumberOfVowels);

  assert.deepEqual(
    [...groupedByNumberOfVowels],
    [
      { key: 2, items: ["apple", "cherry", "kiwi"] },
      { key: 3, items: ["banana"] },
      { key: 4, items: ["blueberry"] },
    ],
  );
});
