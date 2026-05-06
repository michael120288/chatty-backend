# Spy on console.error

**Level:** 74
**ID:** `vitest-074`
**XP:** 100
**Tags:** `vi.spyOn`, `console.error`, `suppress-output`

## Objective

Spy on console.error to verify it is called without polluting test output.

## Story

Verify error logging happens — and suppress the output during tests.

## Hints
1. expect(spy).toHaveBeenCalledWith('Error occurred:', 'disk full')

## Solution

```javascript
import { test, expect, vi } from 'vitest';
function handleError(err) { console.error('Error occurred:', err.message); return false; }
test('logs error', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
  handleError(new Error('disk full'));
  expect(spy).toHaveBeenCalledWith('Error occurred:', 'disk full');
  spy.mockRestore();
});
```

## Explanation

Vitest's `Spy on console.error` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

function handleError(err) {
  console.error('Error occurred:', err.message);
  return false;
}

test('handleError logs to console.error', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

  handleError(new Error('disk full'));

  // TODO: Assert spy was called with 'Error occurred:', 'disk full'

  spy.mockRestore();
});
```
