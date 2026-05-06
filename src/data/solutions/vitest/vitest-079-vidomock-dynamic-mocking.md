# vi.doMock — Dynamic Mocking

**Level:** 79
**ID:** `vitest-079`
**XP:** 100
**Tags:** `vi.doMock`, `dynamic`, `module-mocking`

## Objective

Use vi.doMock() for a non-hoisted, dynamic mock.

## Story

Sometimes you need to mock differently per test — vi.doMock is not hoisted.

## Hints
1. vi.doMock is NOT hoisted — place it inside the test.
2. Use dynamic import() after doMock to get the mocked version.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('doMock', async () => {
  vi.doMock('./config.js', () => ({ ENV: 'test' }));
  const { ENV } = await import('./config.js');
  expect(ENV).toBe('test');
  vi.doUnmock('./config.js');
});
```

## Explanation

Vitest's `vi.doMock` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('dynamic mock with doMock', async () => {
  vi.doMock('./config.js', () => ({ ENV: 'test' }));
  // After doMock, reimport the module to get the mock
  const { ENV } = await import('./config.js');
  // TODO: Assert ENV is 'test'
  vi.doUnmock('./config.js');
});
```
