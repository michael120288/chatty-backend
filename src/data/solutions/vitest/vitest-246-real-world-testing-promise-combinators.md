# Real-World: testing promise combinators

**Level:** 246
**ID:** `vitest-246`
**XP:** 280
**Tags:** `async`, `promises`

## Objective

Complete the starter code using Real-World: testing promise combinators so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing promise combinators to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

async function fetchUser(id: number) {
  if (id <= 0) throw new Error(\`Invalid id: \${id}\`);
  return { id, name: \`User \${id}\` };
}

test('Promise.all resolves all promises', async () => {
  const results = await Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)]);
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual({ id: 1, name: 'User 1' });
  expect(results[2].id).toBe(3);
});

test('Promise.all rejects if any fails', async () => {
  await expect(Promise.all([fetchUser(1), fetchUser(-1), fetchUser(3)])).rejects.toThrow('Invalid id');
});

test('Promise.allSettled returns all results', async () => {
  const results = await Promise.allSettled([fetchUser(1), fetchUser(-1), fetchUser(2)]);
  expect(results[0].status).toBe('fulfilled');
  expect(results[1].status).toBe('rejected');
  expect(results[2].status).toBe('fulfilled');
  if (results[0].status === 'fulfilled') expect(results[0].value.id).toBe(1);
});

test('Promise.race returns fastest', async () => {
  const slow = new Promise<string>(resolve => setTimeout(() => resolve('slow'), 1000));
  const fast = Promise.resolve('fast');
  const winner = await Promise.race([slow, fast]);
  expect(winner).toBe('fast');
});
```

## Explanation

`Real` Test Promise.all, Promise.race, and Promise.allSettled patterns.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function fetchUser(id: number) {
  if (id <= 0) throw new Error(\`Invalid id: \${id}\`);
  return { id, name: \`User \${id}\` };
}

test('Promise.all resolves all promises', async () => {
  const results = await Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)]);
  // TODO: add assertion using Real-World: testing promise combinators
  // TODO: add assertion using Real-World: testing promise combinators
  // TODO: add assertion using Real-World: testing promise combinators
});

test('Promise.all rejects if any fails', async () => {
  // TODO: add assertion using Real-World: testing promise combinators
});

test('Promise.allSettled returns all results', async () => {
  const results = await Promise.allSettled([fetchUser(1), fetchUser(-1), fetchUser(2)]);
  // TODO: add assertion using Real-World: testing promise combinators
  // TODO: add assertion using Real-World: testing promise combinators
  // TODO: add assertion using Real-World: testing promise combinators
  if (results[0].status === 'fulfilled') expect(results[0].value.id).toBe(1);
});

test('Promise.race returns fastest', async () => {
  const slow = new Promise<string>(resolve => setTimeout(() => resolve('slow'), 1000));
  const fast = Promise.resolve('fast');
  const winner = await Promise.race([slow, fast]);
  // TODO: add assertion using Real-World: testing promise combinators
});
```
