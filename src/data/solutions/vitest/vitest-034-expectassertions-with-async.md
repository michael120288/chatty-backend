# expect.assertions with Async

**Level:** 34
**ID:** `vitest-034`
**XP:** 100
**Tags:** `expect.assertions`, `async`, `guard`

## Objective

Combine expect.assertions(n) with an async/await test.

## Story

A guarded async test — ensure both assertions run even in async code.

## Hints
1. expect.assertions(2) — declare before awaiting.
2. assert profile.userId and profile.role

## Solution

```javascript
import { test, expect } from 'vitest';
async function loadProfile(userId) {
  if (!userId) throw new Error('No userId');
  return { userId, role: 'admin' };
}
test('loads profile', async () => {
  expect.assertions(2);
  const profile = await loadProfile(1);
  expect(profile.userId).toBe(1);
  expect(profile.role).toBe('admin');
});
```

## Explanation

Vitest's `expect.assertions with Async` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function loadProfile(userId) {
  if (!userId) throw new Error('No userId');
  return { userId, role: 'admin' };
}

test('loads profile for valid user', async () => {
  expect.assertions(2);
  // TODO: await loadProfile(1) and assert userId === 1 and role === 'admin'
});
```
