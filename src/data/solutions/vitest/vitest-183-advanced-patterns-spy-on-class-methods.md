# Advanced Patterns: spy on class methods

**Level:** 183
**ID:** `vitest-183`
**XP:** 200
**Tags:** `spying`, `mocking`

## Objective

Complete the starter code using Advanced Patterns: spy on class methods so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: spy on class methods to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect, vi, afterEach } from 'vitest';

class Calculator {
  add(a, b) { return a + b; }
  multiply(a, b) { return a * b; }
}

afterEach(() => vi.restoreAllMocks());

test('spy on class instance method', () => {
  const calc = new Calculator();
  const spy = vi.spyOn(calc, 'add');
  const result = calc.add(3, 4);
  expect(result).toBe(7);
  expect(spy).toHaveBeenCalledWith(3, 4);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('spy on prototype method', () => {
  const spy = vi.spyOn(Calculator.prototype, 'multiply');
  const calc = new Calculator();
  calc.multiply(5, 6);
  expect(spy).toHaveBeenCalledWith(5, 6);
});
```

## Explanation

`Advanced Patterns` Use vi.spyOn to spy on prototype methods of a class.

## Starter Code

```javascript
import { test, expect, vi, afterEach } from 'vitest';

class Calculator {
  add(a, b) { return a + b; }
  multiply(a, b) { return a * b; }
}

afterEach(() => vi.restoreAllMocks());

test('spy on class instance method', () => {
  const calc = new Calculator();
  const spy = vi.spyOn(calc, 'add');
  const result = calc.add(3, 4);
  // TODO: add assertion using Advanced Patterns: spy on class methods
  // TODO: add assertion using Advanced Patterns: spy on class methods
  // TODO: add assertion using Advanced Patterns: spy on class methods
});

test('spy on prototype method', () => {
  const spy = vi.spyOn(Calculator.prototype, 'multiply');
  const calc = new Calculator();
  calc.multiply(5, 6);
  // TODO: add assertion using Advanced Patterns: spy on class methods
});
```
