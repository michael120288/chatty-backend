# mockResolvedValueOnce on Spy

**Level:** 67
**ID:** `vitest-067`
**XP:** 100
**Tags:** `mockResolvedValueOnce`, `vi.spyOn`, `async`

## Objective

Use mockResolvedValueOnce on a spied async method.

## Story

A spy returns different async values on first and subsequent calls.

## Hints
1. const r1 = await api.fetch('/test'); expect(r1.data).toBe('mocked');
2. After mockRestore, the original async method runs.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const api = { async fetch(url) { return { url, data: 'real' }; } };
test('once mock then real', async () => {
  const spy = vi.spyOn(api, 'fetch').mockResolvedValueOnce({ url: '/test', data: 'mocked' });
  const r1 = await api.fetch('/test');
  expect(r1.data).toBe('mocked');
  spy.mockRestore();
  const r2 = await api.fetch('/real');
  expect(r2.data).toBe('real');
});
```

## Explanation

Vitest's `mockResolvedValueOnce on Spy` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

const api = {
  async fetch(url) { return { url, data: 'real' }; }
};

test('first call returns mock, second returns real', async () => {
  const spy = vi.spyOn(api, 'fetch')
    .mockResolvedValueOnce({ url: '/test', data: 'mocked' });

  // TODO: First call — assert data is 'mocked'
  // TODO: Call spy.mockRestore() then assert the method works normally
  // (Hint: after restore, call api.fetch('/real') and assert data is 'real')
});
```
