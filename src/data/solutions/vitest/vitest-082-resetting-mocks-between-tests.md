# Resetting Mocks Between Tests

**Level:** 82
**ID:** `vitest-082`
**XP:** 100
**Tags:** `mockClear`, `beforeEach`, `test-isolation`

## Objective

Manually reset mock state between tests in different scenarios.

## Story

Stale mock state bleeds between tests — use clearMocks or resetMocks.

## Hints
1. mockClear() in beforeEach resets call count before each test.
2. Each test sees a fresh call count.

## Solution

```javascript
import { test, expect, vi, beforeEach } from 'vitest';
const notify = vi.fn();
beforeEach(() => { notify.mockClear(); });
test('called twice', () => {
  notify('a'); notify('b');
  expect(notify).toHaveBeenCalledTimes(2);
});
test('called once', () => {
  notify('c');
  expect(notify).toHaveBeenCalledTimes(1);
});
```

## Explanation

Vitest's `Resetting Mocks Between Tests` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi, beforeEach } from 'vitest';

const notify = vi.fn();

beforeEach(() => {
  notify.mockClear();
});

test('first test: notify called twice', () => {
  notify('a'); notify('b');
  expect(notify).toHaveBeenCalledTimes(2);
});

test('second test: notify called once (fresh start)', () => {
  notify('c');
  // TODO: Assert notify called exactly once (not 3, because it was cleared)
});
```
