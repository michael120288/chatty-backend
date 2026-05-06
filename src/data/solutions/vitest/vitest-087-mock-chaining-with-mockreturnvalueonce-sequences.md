# Mock Chaining with mockReturnValueOnce Sequences

**Level:** 87
**ID:** `vitest-087`
**XP:** 100
**Tags:** `mockRejectedValueOnce`, `mockResolvedValueOnce`, `retry`

## Objective

Use multiple mockResolvedValueOnce calls to simulate retry behaviour.

## Story

An API call returns different data on retry attempts. Simulate the sequence.

## Hints
1. Chain mockRejectedValueOnce twice then mockResolvedValueOnce.
2. result.data should be 'success' after 3 attempts.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
async function fetchWithRetry(fn, retries=3) {
  for (let i=0;i<retries;i++) {
    try { return await fn(); } catch { if(i===retries-1) throw new Error('Max retries'); }
  }
}
test('third retry', async () => {
  const mock = vi.fn()
    .mockRejectedValueOnce(new Error('fail 1'))
    .mockRejectedValueOnce(new Error('fail 2'))
    .mockResolvedValueOnce({ data:'success' });
  const result = await fetchWithRetry(mock);
  expect(result.data).toBe('success');
  expect(mock).toHaveBeenCalledTimes(3);
});
```

## Explanation

Vitest's `Mock Chaining with mockReturnValueOnce Sequences` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

async function fetchWithRetry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch {
      if (i === retries - 1) throw new Error('Max retries reached');
    }
  }
}

test('succeeds on third retry', async () => {
  const mockFetch = vi.fn()
    .mockRejectedValueOnce(new Error('fail 1'))
    .mockRejectedValueOnce(new Error('fail 2'))
    .mockResolvedValueOnce({ data: 'success' });

  const result = await fetchWithRetry(mockFetch);
  // TODO: Assert result.data is 'success'
  // TODO: Assert mockFetch was called 3 times
});
```
