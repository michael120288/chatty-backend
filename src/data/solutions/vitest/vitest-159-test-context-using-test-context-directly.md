# Test Context: using test context directly

**Level:** 159
**ID:** `vitest-159`
**XP:** 170
**Tags:** `test`, `context`

## Objective

Complete the starter code using Test Context: using test context directly so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: using test context directly to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test, expect } from 'vitest';

test('access test context', (context) => {
  expect(context.task.name).toBe('access test context');
  expect(typeof context.task.id).toBe('string');
});

test('context task is defined', (ctx) => {
  expect(ctx.task).toBeDefined();
  expect(ctx.task.type).toBe('test');
});
```

## Explanation

`Test Context` Access test metadata from the test context object.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('access test context', (context) => {
  // TODO: add assertion using Test Context: using test context directly
  // TODO: add assertion using Test Context: using test context directly
});

test('context task is defined', (ctx) => {
  // TODO: add assertion using Test Context: using test context directly
  // TODO: add assertion using Test Context: using test context directly
});
```
