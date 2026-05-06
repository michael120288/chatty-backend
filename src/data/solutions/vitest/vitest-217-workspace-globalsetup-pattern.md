# Workspace: globalSetup pattern

**Level:** 217
**ID:** `vitest-217`
**XP:** 190
**Tags:** `configuration`, `workspaces`

## Objective

Complete the starter code using Workspace: globalSetup pattern so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: globalSetup pattern to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { test, expect, beforeAll, afterAll } from 'vitest';

let server: { port: number; running: boolean; stop: () => void } | null = null;

function createMockServer(port: number) {
  return {
    port,
    running: true,
    stop() { this.running = false; }
  };
}

beforeAll(() => {
  server = createMockServer(8080);
});

afterAll(() => {
  server?.stop();
  server = null;
});

test('server is running during tests', () => {
  expect(server).not.toBeNull();
  expect(server!.running).toBe(true);
  expect(server!.port).toBe(8080);
});

test('server port is accessible', () => {
  expect(server!.port).toBeGreaterThan(0);
});
```

## Explanation

`Workspace` Simulate a globalSetup/teardown pattern in a single file.

## Starter Code

```javascript
import { test, expect, beforeAll, afterAll } from 'vitest';

let server: { port: number; running: boolean; stop: () => void } | null = null;

function createMockServer(port: number) {
  return {
    port,
    running: true,
    stop() { this.running = false; }
  };
}

beforeAll(() => {
  server = createMockServer(8080);
});

afterAll(() => {
  server?.stop();
  server = null;
});

test('server is running during tests', () => {
  // TODO: add assertion using Workspace: globalSetup pattern
  // TODO: add assertion using Workspace: globalSetup pattern
  // TODO: add assertion using Workspace: globalSetup pattern
});

test('server port is accessible', () => {
  // TODO: add assertion using Workspace: globalSetup pattern
});
```
