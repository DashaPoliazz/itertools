import compress from "../lib/producers/compress";
import { it } from "node:test";
import assert from "assert";

// Test case 1: Basic functionality
it("should compress values correctly", () => {
  const data = ["apple", "banana", "cherry", "date"];
  const selectors = [true, false, true, false];
  const compressed = compress(data, selectors);
  assert.deepEqual([...compressed], ["apple", "cherry"]);
});

// Test case 2: All true selectors
it("should return all elements when all selectors are true", () => {
  const data = ["apple", "banana", "cherry", "date"];
  const selectors = [true, true, true, true];
  const compressed = compress(data, selectors);
  assert.deepEqual([...compressed], ["apple", "banana", "cherry", "date"]);
});

// Test case 3: All false selectors
it("should return no elements when all selectors are false", () => {
  const data = ["apple", "banana", "cherry", "date"];
  const selectors = [false, false, false, false];
  const compressed = compress(data, selectors);
  assert.deepEqual([...compressed], []);
});

// Test case 4: Selectors array shorter than data array
it("should stop when selectors are exhausted", () => {
  const data = ["apple", "banana", "cherry", "date"];
  const selectors = [true, false];
  const compressed = compress(data, selectors);
  assert.deepEqual([...compressed], ["apple"]);
});

// Test case 5: Selectors array longer than data array
it("should ignore extra selectors", () => {
  const data = ["apple", "banana"];
  const selectors = [true, false, true, true];
  const compressed = compress(data, selectors);
  assert.deepEqual([...compressed], ["apple"]);
});

// Test case 6: Empty data array
it("should return no elements when data is empty", () => {
  const data: string[] = [];
  const selectors = [true, false, true, true];
  const compressed = compress(data, selectors);
  assert.deepEqual([...compressed], []);
});

// Test case 7: Empty selectors array
it("should return no elements when selectors are empty", () => {
  const data = ["apple", "banana", "cherry", "date"];
  const selectors: boolean[] = [];
  const compressed = compress(data, selectors);
  assert.deepEqual([...compressed], []);
});
