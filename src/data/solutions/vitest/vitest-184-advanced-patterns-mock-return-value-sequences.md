# Advanced Patterns: mock return value sequences

**Level:** 184
**ID:** `vitest-184`
**XP:** 190
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: mock return value sequences so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: mock return value sequences to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

test('mock return value sequences', () => {
  const getStatus = vi.fn()
    .mockReturnValueOnce('loading')
    .mockReturnValueOnce('loading')
    .mockReturnValueOnce('success')
    .mockReturnValue('idle');

  expect(getStatus()).toBe('loading');
  expect(getStatus()).toBe('loading');
  expect(getStatus()).toBe('success');
  expect(getStatus()).toBe('idle');
  expect(getStatus()).toBe('idle');
  expect(getStatus).toHaveBeenCalledTimes(5);
});
```

## Explanation

`Advanced Patterns` Use mockReturnValueOnce chains for complex sequences.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('mock return value sequences', () => {
  const getStatus = vi.fn()
    .mockReturnValueOnce('loading')
    .mockReturnValueOnce('loading')
    .mockReturnValueOnce('success')
    .mockReturnValue('idle');

  // TODO: add assertion using Advanced Patterns: mock return value sequences
  // TODO: add assertion using Advanced Patterns: mock return value sequences
  // TODO: add assertion using Advanced Patterns: mock return value sequences
  // TODO: add assertion using Advanced Patterns: mock return value sequences
  // TODO: add assertion using Advanced Patterns: mock return value sequences
  // TODO: add assertion using Advanced Patterns: mock return value sequences
});
```
