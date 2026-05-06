# Promise Race

**Level:** 43
**ID:** `vitest-043`
**XP:** 100
**Tags:** `Promise.race`, `async`, `timing`

## Objective

Test Promise.race to verify the first resolved value.

## Story

Two promises race — test which one wins.

## Hints
1. const winner = await Promise.race([fast(), slow()]);
2. expect(winner).toBe('fast');

## Solution

```javascript
import { test, expect } from 'vitest';
function fast() { return new Promise(r => setTimeout(() => r('fast'), 10)); }
function slow() { return new Promise(r => setTimeout(() => r('slow'), 100)); }
test('fast wins', async () => {
  const winner = await Promise.race([fast(), slow()]);
  expect(winner).toBe('fast');
});
```

## Explanation

Vitest's `Promise Race` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function fast() { return new Promise(r => setTimeout(() => r('fast'), 10)); }
function slow() { return new Promise(r => setTimeout(() => r('slow'), 100)); }

test('fast wins the race', async () => {
  // TODO: Use Promise.race([fast(), slow()]) and assert result is 'fast'
});
```
