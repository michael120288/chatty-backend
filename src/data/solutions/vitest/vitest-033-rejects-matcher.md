# rejects Matcher

**Level:** 33
**ID:** `vitest-033`
**XP:** 100
**Tags:** `rejects`, `promises`, `errors`

## Objective

Use .rejects to test a Promise that rejects.

## Story

Some Promises are cursed and reject. Verify the rejection.

## Hints
1. await expect(fetchData(0)).rejects.toThrow('Invalid ID')
2. await expect(fetchData(1)).resolves.toEqual({ id: 1 })

## Solution

```javascript
import { test, expect } from 'vitest';
function fetchData(id) {
  if (id <= 0) return Promise.reject(new Error('Invalid ID'));
  return Promise.resolve({ id });
}
test('rejects', async () => { await expect(fetchData(0)).rejects.toThrow('Invalid ID'); });
test('resolves', async () => { await expect(fetchData(1)).resolves.toEqual({ id: 1 }); });
```

## Explanation

Vitest's `rejects Matcher` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function fetchData(id) {
  if (id <= 0) return Promise.reject(new Error('Invalid ID'));
  return Promise.resolve({ id });
}

test('rejects for invalid id', async () => {
  // TODO: Assert fetchData(0) rejects with message 'Invalid ID'
});

test('resolves for valid id', async () => {
  // TODO: Assert fetchData(1) resolves with { id: 1 }
});
```
