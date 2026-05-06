# beforeEach and afterEach

**Level:** 91
**ID:** `vitest-091`
**XP:** 100
**Tags:** `beforeEach`, `afterEach`, `setup-teardown`

## Objective

Use beforeEach and afterEach to manage shared test state.

## Story

Each test needs a fresh counter. Set it up before each test and log after.

## Hints
1. beforeEach(() => { counter = 0; })
2. afterEach runs after each test — cleanup resources here.

## Solution

```javascript
import { test, expect, beforeEach, afterEach } from 'vitest';
let counter;
beforeEach(() => { counter = 0; });
afterEach(() => { expect(counter).not.toBeNull(); });
test('starts at 0', () => { expect(counter).toBe(0); });
test('increments', () => { counter++; expect(counter).toBe(1); });
test('resets', () => { expect(counter).toBe(0); });
```

## Explanation

Vitest's `beforeEach and afterEach` is a powerful testing utility.

## Starter Code

```javascript
import { describe, test, expect, beforeEach, afterEach } from 'vitest';

let counter;

beforeEach(() => {
  // TODO: Set counter to 0
});

afterEach(() => {
  // TODO: Log or verify counter is still defined (just check counter is not null)
  // (This is a simple teardown demo)
});

test('counter starts at 0', () => {
  expect(counter).toBe(0);
});

test('counter can be incremented', () => {
  counter++;
  expect(counter).toBe(1);
});

test('counter resets to 0 between tests', () => {
  expect(counter).toBe(0);
});
```
