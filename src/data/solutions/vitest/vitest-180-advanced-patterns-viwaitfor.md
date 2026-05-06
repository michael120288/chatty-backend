# Advanced Patterns: vi.waitFor()

**Level:** 180
**ID:** `vitest-180`
**XP:** 210
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: vi.waitFor so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: vi.waitFor() to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

test('vi.waitFor retries until condition is met', async () => {
  let count = 0;
  const increment = () => { count++; };
  const intervalId = setInterval(increment, 10);

  await vi.waitFor(() => {
    expect(count).toBeGreaterThanOrEqual(3);
  }, { timeout: 1000 });

  clearInterval(intervalId);
  expect(count).toBeGreaterThanOrEqual(3);
});
```

## Explanation

`Advanced Patterns` Use vi.waitFor() to wait for async conditions.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('vi.waitFor retries until condition is met', async () => {
  let count = 0;
  const increment = () => { count++; };
  const intervalId = setInterval(increment, 10);

  await vi.waitFor(() => {
    // TODO: add assertion using Advanced Patterns: vi.waitFor
  }, { timeout: 1000 });

  clearInterval(intervalId);
  // TODO: add assertion using Advanced Patterns: vi.waitFor
});
```
