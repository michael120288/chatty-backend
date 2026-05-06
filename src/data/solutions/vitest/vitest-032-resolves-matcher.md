# resolves Matcher

**Level:** 32
**ID:** `vitest-032`
**XP:** 100
**Tags:** `resolves`, `promises`, `async`

## Objective

Use .resolves to test a Promise that resolves to a value.

## Story

Test a Promise directly with .resolves to unwrap its value.

## Hints
1. await expect(getScore()).resolves.toBe(42)
2. await expect(p).resolves.toMatchObject({ name: 'Bob' })

## Solution

```javascript
import { test, expect } from 'vitest';
function getScore() { return Promise.resolve(42); }
test('score', async () => { await expect(getScore()).resolves.toBe(42); });
test('user', async () => {
  await expect(Promise.resolve({ name: 'Bob' })).resolves.toMatchObject({ name: 'Bob' });
});
```

## Explanation

Vitest's `resolves Matcher` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function getScore() {
  return Promise.resolve(42);
}

test('score resolves to 42', async () => {
  // TODO: Use .resolves.toBe(42)
});

test('user resolves with name', async () => {
  const p = Promise.resolve({ name: 'Bob' });
  // TODO: Use .resolves.toMatchObject
});
```
