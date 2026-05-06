# Coverage: covering async/await error paths

**Level:** 192
**ID:** `vitest-192`
**XP:** 180
**Tags:** `async`, `promises`

## Objective

Complete the starter code using Coverage: covering async/await error paths so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: covering async/await error paths to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: covering async/await error paths` in your test assertions.
2. Check the Vitest docs for `Coverage: covering async/await error paths` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

async function fetchData(url) {
  if (!url) throw new Error('URL required');
  if (!url.startsWith('https://')) throw new Error('HTTPS required');
  return { url, status: 200, data: 'response' };
}

test('async function: all paths covered', async () => {
  await expect(fetchData()).rejects.toThrow('URL required');
  await expect(fetchData('http://example.com')).rejects.toThrow('HTTPS required');
  const result = await fetchData('https://example.com');
  expect(result.status).toBe(200);
  expect(result.data).toBe('response');
});
```

## Explanation

`Coverage` Test both the happy path and rejection in async functions.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function fetchData(url) {
  if (!url) throw new Error('URL required');
  if (!url.startsWith('https://')) throw new Error('HTTPS required');
  return { url, status: 200, data: 'response' };
}

test('async function: all paths covered', async () => {
  // TODO: add assertion using Coverage: covering async/await error paths
  // TODO: add assertion using Coverage: covering async/await error paths
  const result = await fetchData('https://example.com');
  // TODO: add assertion using Coverage: covering async/await error paths
  // TODO: add assertion using Coverage: covering async/await error paths
});
```
