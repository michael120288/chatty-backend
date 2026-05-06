# Table-Driven Tests: stateful class

**Level:** 130
**ID:** `vitest-130`
**XP:** 170
**Tags:** `table`, `driven`

## Objective

Complete the starter code using Table-Driven Tests: stateful class so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: stateful class to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { test, expect } from 'vitest';

class Counter {
  constructor(start = 0) { this.value = start; }
  increment() { this.value++; }
  decrement() { this.value--; }
}

test.each([
  [0],
  [5],
  [10],
])('Counter starting at %i increments correctly', ([start]) => {
  const c = new Counter(start);
  c.increment();
  expect(c.value).toBe(start + 1);
});
```

## Explanation

`Table` Test a stateful class with multiple initial conditions.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class Counter {
  constructor(start = 0) { this.value = start; }
  increment() { this.value++; }
  decrement() { this.value--; }
}

test.each([
  [0, 1, 0],
  [5, 6, 5],
  [10, 11, 10],
])('Counter starting at %i: increment=%i, decrement=%i', (start, afterInc, afterDec) => {
  const c = new Counter(start);
  c.increment();
  // TODO: assert c.value equals afterInc
  c.decrement();
  c.decrement();
  // TODO: assert c.value equals afterDec - 1 + 1 - 1
});
```
