# Module Mocking with Named Exports

**Level:** 86
**ID:** `vitest-086`
**XP:** 100
**Tags:** `vi.mock`, `named-exports`, `async-mocks`

## Objective

Mock multiple named exports in a single vi.mock() factory.

## Story

Replace multiple named exports from a module at once.

## Hints
1. Each function is mocked independently.
2. Assert each resolved value separately.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const api = {
  getUser: vi.fn().mockResolvedValue({ id:1, name:'Mocked' }),
  getPost: vi.fn().mockResolvedValue({ id:10, title:'Mocked Post' }),
  deleteUser: vi.fn().mockResolvedValue({ success:true })
};
test('all mocked', async () => {
  const user = await api.getUser(1);
  const post = await api.getPost(10);
  const del = await api.deleteUser(1);
  expect(user.name).toBe('Mocked');
  expect(post.title).toBe('Mocked Post');
  expect(del.success).toBe(true);
});
```

## Explanation

Vitest's `Module Mocking with Named Exports` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

// Simulating named exports from './api'
const api = {
  getUser: vi.fn().mockResolvedValue({ id: 1, name: 'Mocked' }),
  getPost: vi.fn().mockResolvedValue({ id: 10, title: 'Mocked Post' }),
  deleteUser: vi.fn().mockResolvedValue({ success: true })
};

test('all named exports are mocked', async () => {
  const user = await api.getUser(1);
  const post = await api.getPost(10);
  const del = await api.deleteUser(1);

  // TODO: Assert user.name is 'Mocked'
  // TODO: Assert post.title is 'Mocked Post'
  // TODO: Assert del.success is true
});
```
