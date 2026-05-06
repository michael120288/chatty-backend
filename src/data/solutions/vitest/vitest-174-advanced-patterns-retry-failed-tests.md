# Advanced Patterns: retry failed tests

**Level:** 174
**ID:** `vitest-174`
**XP:** 200
**Tags:** `configuration`, `retry`

## Objective

Complete the starter code using Advanced Patterns: retry failed tests so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: retry failed tests to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

let attempts = 0;

function unstableOperation() {
  attempts++;
  if (attempts < 3) throw new Error('Not ready yet');
  return 'success';
}

test('retry until success', { retry: 3 }, () => {
  const result = unstableOperation();
  expect(result).toBe('success');
  expect(attempts).toBeGreaterThanOrEqual(1);
});
```

## Explanation

`Advanced Patterns` Use test.retry to automatically retry flaky tests.

## Starter Code

```javascript
import { test, expect } from 'vitest';

let attempts = 0;

function unstableOperation() {
  attempts++;
  if (attempts < 3) throw new Error('Not ready yet');
  return 'success';
}

test('retry until success', { retry: 3 }, () => {
  const result = unstableOperation();
  // TODO: add assertion using Advanced Patterns: retry failed tests
  // TODO: add assertion using Advanced Patterns: retry failed tests
});
```
