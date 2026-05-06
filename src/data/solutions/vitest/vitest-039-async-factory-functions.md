# Async Factory Functions

**Level:** 39
**ID:** `vitest-039`
**XP:** 100
**Tags:** `async`, `factory`, `objects`

## Objective

Test an async factory function that returns a configured object.

## Story

A factory creates configured instances asynchronously — test the result.

## Hints
1. const server = await createServer(3000);
2. expect(server.port).toBe(3000); expect(server.status).toBe('ready');

## Solution

```javascript
import { test, expect } from 'vitest';
async function createServer(port) {
  await new Promise(r => setTimeout(r, 0));
  return { port, status: 'ready', start: () => true };
}
test('server ready', async () => {
  const server = await createServer(3000);
  expect(server.port).toBe(3000);
  expect(server.status).toBe('ready');
});
```

## Explanation

Vitest's `Async Factory Functions` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function createServer(port) {
  await new Promise(r => setTimeout(r, 0)); // simulate async
  return { port, status: 'ready', start: () => true };
}

test('server is ready on correct port', async () => {
  // TODO: await createServer(3000) and assert port and status
});
```
