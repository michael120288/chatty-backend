# TypeScript: async typed functions

**Level:** 211
**ID:** `vitest-211`
**XP:** 200
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: async typed functions so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: async typed functions to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

async function fetchResource<T>(id: number, resource: string): Promise<ApiResponse<T>> {
  if (id <= 0) throw new Error('Invalid ID');
  return {
    data: { id, resource } as unknown as T,
    status: 200,
    headers: { 'content-type': 'application/json' },
  };
}

test('fetchResource typed response', async () => {
  interface Item { id: number; resource: string; }
  const response = await fetchResource<Item>(1, 'users');
  expect(response.status).toBe(200);
  expect(response.data.id).toBe(1);
  expect(response.headers['content-type']).toBe('application/json');
});

test('fetchResource rejects invalid ID', async () => {
  await expect(fetchResource(0, 'users')).rejects.toThrow('Invalid ID');
});
```

## Explanation

`TypeScript` Test async TypeScript functions with typed return values.

## Starter Code

```javascript
import { test, expect } from 'vitest';

interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

async function fetchResource<T>(id: number, resource: string): Promise<ApiResponse<T>> {
  if (id <= 0) throw new Error('Invalid ID');
  return {
    data: { id, resource } as unknown as T,
    status: 200,
    headers: { 'content-type': 'application/json' },
  };
}

test('fetchResource typed response', async () => {
  interface Item { id: number; resource: string; }
  const response = await fetchResource<Item>(1, 'users');
  // TODO: add assertion using TypeScript: async typed functions
  // TODO: add assertion using TypeScript: async typed functions
  // TODO: add assertion using TypeScript: async typed functions
});

test('fetchResource rejects invalid ID', async () => {
  // TODO: add assertion using TypeScript: async typed functions
});
```
