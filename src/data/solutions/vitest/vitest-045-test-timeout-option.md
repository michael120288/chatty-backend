# Test Timeout Option

**Level:** 45
**ID:** `vitest-045`
**XP:** 100
**Tags:** `timeout`, `test-options`, `async`

## Objective

Write a test with a custom timeout using the third argument to test().

## Story

A slow operation might hang. Set a per-test timeout to catch it.

## Hints
1. test('name', async () => { ... }, 1000) — third argument is timeout in ms.

## Solution

```javascript
import { test, expect } from 'vitest';
async function quickOp() { return 'done'; }
test('completes within timeout', async () => {
  const result = await quickOp();
  expect(result).toBe('done');
}, 1000);
```

## Explanation

Vitest's `Test Timeout Option` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function quickOp() {
  return 'done';
}

// TODO: Write a test with a 1000ms timeout as the third argument
// test('name', async () => { ... }, timeout)
test('completes within timeout', async () => {
  const result = await quickOp();
  expect(result).toBe('done');
}, 1000);
```
