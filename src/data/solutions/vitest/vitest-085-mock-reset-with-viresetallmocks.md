# Mock Reset with vi.resetAllMocks

**Level:** 85
**ID:** `vitest-085`
**XP:** 100
**Tags:** `vi.resetAllMocks`, `cleanup`, `global-reset`

## Objective

Use vi.resetAllMocks() to reset all mocks simultaneously.

## Story

After tests that use many mocks, reset all at once.

## Hints
1. vi.resetAllMocks() resets all mock state including return values.
2. After reset, vi.fn() returns undefined.

## Solution

```javascript
import { test, expect, vi, beforeEach } from 'vitest';
const a = vi.fn().mockReturnValue(1);
const b = vi.fn().mockReturnValue(2);
beforeEach(() => { vi.resetAllMocks(); });
test('undefined after reset', () => {
  expect(a()).toBeUndefined();
  expect(b()).toBeUndefined();
  expect(a).toHaveBeenCalledTimes(1); // called once in THIS test
  expect(b).toHaveBeenCalledTimes(1);
});
test('fresh values', () => {
  a.mockReturnValue(10); b.mockReturnValue(20);
  expect(a()).toBe(10); expect(b()).toBe(20);
});
```

## Explanation

Vitest's `Mock Reset with vi.resetAllMocks` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi, beforeEach } from 'vitest';

const a = vi.fn().mockReturnValue(1);
const b = vi.fn().mockReturnValue(2);

beforeEach(() => {
  vi.resetAllMocks();
});

test('both mocks return undefined after reset', () => {
  // TODO: Assert a() returns undefined
  // TODO: Assert b() returns undefined
  // TODO: Assert both have 0 calls
});

test('configure fresh return values', () => {
  a.mockReturnValue(10);
  b.mockReturnValue(20);
  expect(a()).toBe(10);
  expect(b()).toBe(20);
});
```
