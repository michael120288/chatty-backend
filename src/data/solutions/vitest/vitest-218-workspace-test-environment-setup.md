# Workspace: test environment setup

**Level:** 218
**ID:** `vitest-218`
**XP:** 200
**Tags:** `configuration`, `environment`

## Objective

Complete the starter code using Workspace: test environment setup so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: test environment setup to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { test, expect, beforeEach, afterEach } from 'vitest';

class TestEnvironment {
  private cleanupTasks: Array<() => void> = [];
  register(task: () => void) { this.cleanupTasks.push(task); }
  cleanup() { this.cleanupTasks.forEach(t => t()); this.cleanupTasks = []; }
}

let env: TestEnvironment;

beforeEach(() => { env = new TestEnvironment(); });
afterEach(() => { env.cleanup(); });

test('cleanup tasks run after test', () => {
  const log: string[] = [];
  env.register(() => log.push('cleanup1'));
  env.register(() => log.push('cleanup2'));
  expect(log).toHaveLength(0);
  env.cleanup();
  expect(log).toEqual(['cleanup1', 'cleanup2']);
});

test('env is fresh for each test', () => {
  expect(env).toBeDefined();
  const log: string[] = [];
  env.register(() => log.push('only-one'));
  env.cleanup();
  expect(log).toHaveLength(1);
});
```

## Explanation

`Workspace` Set up test environment with proper isolation.

## Starter Code

```javascript
import { test, expect, beforeEach, afterEach } from 'vitest';

class TestEnvironment {
  private cleanupTasks: Array<() => void> = [];
  register(task: () => void) { this.cleanupTasks.push(task); }
  cleanup() { this.cleanupTasks.forEach(t => t()); this.cleanupTasks = []; }
}

let env: TestEnvironment;

beforeEach(() => { env = new TestEnvironment(); });
afterEach(() => { env.cleanup(); });

test('cleanup tasks run after test', () => {
  const log: string[] = [];
  env.register(() => log.push('cleanup1'));
  env.register(() => log.push('cleanup2'));
  // TODO: add assertion using Workspace: test environment setup
  env.cleanup();
  // TODO: add assertion using Workspace: test environment setup
});

test('env is fresh for each test', () => {
  // TODO: add assertion using Workspace: test environment setup
  const log: string[] = [];
  env.register(() => log.push('only-one'));
  env.cleanup();
  // TODO: add assertion using Workspace: test environment setup
});
```
