# Promise.all Testing

**Level:** 38
**ID:** `vitest-038`
**XP:** 100
**Tags:** `Promise.all`, `async`, `parallel`

## Objective

Use Promise.all in a test to await multiple async operations simultaneously.

## Story

Run multiple async operations in parallel and verify all results.

## Hints
1. const [a, b, c] = await Promise.all([getA(), getB(), getC()]);
2. expect(a + b + c).toBe(6)

## Solution

```javascript
import { test, expect } from 'vitest';
async function getA() { return 1; }
async function getB() { return 2; }
async function getC() { return 3; }
test('sum to 6', async () => {
  const [a, b, c] = await Promise.all([getA(), getB(), getC()]);
  expect(a + b + c).toBe(6);
});
```

## Explanation

Vitest's `Promise.all Testing` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function getA() { return 1; }
async function getB() { return 2; }
async function getC() { return 3; }

test('all values sum to 6', async () => {
  // TODO: Use Promise.all to get [a, b, c] and assert sum is 6
});
```
