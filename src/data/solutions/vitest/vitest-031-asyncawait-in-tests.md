# Async/Await in Tests

**Level:** 31
**ID:** `vitest-031`
**XP:** 100
**Tags:** `async`, `await`, `promises`

## Objective

Write an async test using await.

## Story

The oracle speaks asynchronously. Use async/await to hear its wisdom.

## Hints
1. Mark the test callback as async.
2. const user = await fetchUser(1); expect(user.name).toBe('Alice');

## Solution

```javascript
import { test, expect } from 'vitest';
async function fetchUser(id) { return { id, name: 'Alice' }; }
test('fetches user by id', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('Alice');
});
```

## Explanation

Vitest's `Async/Await in Tests` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function fetchUser(id) {
  return { id, name: 'Alice' };
}

test('fetches user by id', async () => {
  // TODO: await fetchUser(1) and assert name is 'Alice'
});
```
