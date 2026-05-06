# Workspace: test pool and threading

**Level:** 228
**ID:** `vitest-228`
**XP:** 190
**Tags:** `configuration`, `workspaces`

## Objective

Complete the starter code using Workspace: test pool and threading so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: test pool and threading to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { test, expect } from 'vitest';

function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = 0; },
    value: () => count,
  };
}

test('counter thread-safe pattern', () => {
  const counter = createCounter();
  const operations = Array.from({ length: 100 }, (_, i) =>
    i % 2 === 0 ? counter.increment() : counter.decrement()
  );
  expect(counter.value()).toBe(0);
});

test('independent counters dont interfere', () => {
  const c1 = createCounter();
  const c2 = createCounter();
  c1.increment(); c1.increment();
  c2.increment();
  expect(c1.value()).toBe(2);
  expect(c2.value()).toBe(1);
});
```

## Explanation

`Workspace` Understand parallelism by testing thread-safe operations.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = 0; },
    value: () => count,
  };
}

test('counter thread-safe pattern', () => {
  const counter = createCounter();
  const operations = Array.from({ length: 100 }, (_, i) =>
    i % 2 === 0 ? counter.increment() : counter.decrement()
  );
  // 50 increments, 50 decrements = 0
  // TODO: add assertion using Workspace: test pool and threading
});

test('independent counters dont interfere', () => {
  const c1 = createCounter();
  const c2 = createCounter();
  c1.increment(); c1.increment();
  c2.increment();
  // TODO: add assertion using Workspace: test pool and threading
  // TODO: add assertion using Workspace: test pool and threading
});
```
