# Nested describe Blocks

**Level:** 9
**ID:** `vitest-009`
**XP:** 100
**Tags:** `describe`, `nested`, `organisation`

## Objective

Create nested describe blocks for a calculator with add and subtract sub-suites.

## Story

The dungeon has rooms inside rooms. Nest describe blocks to model hierarchical test suites.

## Hints
1. describe inside describe is valid.
2. Each inner describe can have its own tests.

## Solution

```javascript
import { describe, test, expect } from 'vitest';
const calc = { add: (a, b) => a + b, subtract: (a, b) => a - b };
describe('calculator', () => {
  describe('add', () => {
    test('2 + 3 = 5', () => { expect(calc.add(2, 3)).toBe(5); });
  });
  describe('subtract', () => {
    test('5 - 3 = 2', () => { expect(calc.subtract(5, 3)).toBe(2); });
  });
});
```

## Explanation

Vitest's `Nested describe Blocks` is a powerful testing utility.

## Starter Code

```javascript
import { describe, test, expect } from 'vitest';

const calc = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

describe('calculator', () => {
  // TODO: Add a nested describe 'add' with one test
  // TODO: Add a nested describe 'subtract' with one test
});
```
