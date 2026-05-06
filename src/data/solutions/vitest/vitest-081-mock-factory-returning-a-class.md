# Mock Factory Returning a Class

**Level:** 81
**ID:** `vitest-081`
**XP:** 100
**Tags:** `vi.fn`, `class-mock`, `constructor`

## Objective

Mock a module that exports a class, replacing it with a mock constructor.

## Story

The mocked module exports a class — return a mock class from the factory.

## Hints
1. new MockHttpClient() calls the vi.fn() constructor mock.
2. The instance methods come from mockImplementation's return object.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const MockHttpClient = vi.fn().mockImplementation(() => ({
  get: vi.fn().mockResolvedValue({ status: 200, data: 'ok' })
}));
test('mock class', async () => {
  const client = new MockHttpClient();
  const res = await client.get('/api/data');
  expect(res.status).toBe(200);
  expect(res.data).toBe('ok');
  expect(MockHttpClient).toHaveBeenCalledTimes(1);
});
```

## Explanation

Vitest's `Mock Factory Returning a Class` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

// Simulating a class from an external module
class HttpClient {
  get(url) { return fetch(url); }
}

// Mock the class
const MockHttpClient = vi.fn().mockImplementation(() => ({
  get: vi.fn().mockResolvedValue({ status: 200, data: 'ok' })
}));

test('mock class returns controlled response', async () => {
  const client = new MockHttpClient();
  const res = await client.get('/api/data');
  // TODO: Assert res.status is 200 and res.data is 'ok'
  // TODO: Assert MockHttpClient was called (instantiated) once
});
```
