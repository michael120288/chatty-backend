# beforeAll and afterAll

**Level:** 92
**ID:** `vitest-092`
**XP:** 100
**Tags:** `beforeAll`, `afterAll`, `one-time-setup`

## Objective

Use beforeAll and afterAll for one-time setup and teardown.

## Story

An expensive resource is created once and shared across all tests.

## Hints
1. beforeAll runs once before all tests in scope.
2. afterAll runs once after all tests complete.

## Solution

```javascript
import { test, expect, beforeAll, afterAll } from 'vitest';
let server;
beforeAll(async () => { server = { port: 3000, running: true }; });
afterAll(async () => { server.running = false; });
test('running', () => { expect(server.running).toBe(true); expect(server.port).toBe(3000); });
test('port', () => { expect(server.port).toBe(3000); });
```

## Explanation

Vitest's `beforeAll and afterAll` is a powerful testing utility.

## Starter Code

```javascript
import { describe, test, expect, beforeAll, afterAll } from 'vitest';

let server;

beforeAll(async () => {
  // TODO: 'Start' a fake server: server = { port: 3000, running: true }
});

afterAll(async () => {
  // TODO: 'Stop' the server: server.running = false
});

test('server is running', () => {
  expect(server.running).toBe(true);
  expect(server.port).toBe(3000);
});

test('server port is correct', () => {
  expect(server.port).toBe(3000);
});
```
