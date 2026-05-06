# Real-World: testing middleware error handling

**Level:** 249
**ID:** `vitest-249`
**XP:** 290
**Tags:** `errors`, `assertions`

## Objective

Complete the starter code using Real-World: testing middleware error handling so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing middleware error handling to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

interface Context { data: any; error?: Error; statusCode?: number; }
type Middleware = (ctx: Context, next: () => void) => void;

function createApp(...middlewares: Middleware[]) {
  return function(ctx: Context) {
    let index = -1;
    function next() {
      index++;
      if (index < middlewares.length) middlewares[index](ctx, next);
    }
    next();
    return ctx;
  };
}

const errorHandler: Middleware = (ctx, next) => {
  try { next(); }
  catch (err) {
    ctx.error = err as Error;
    ctx.statusCode = 500;
  }
};

const authMiddleware: Middleware = (ctx, next) => {
  if (!ctx.data.token) throw new Error('Unauthorized');
  ctx.data.userId = 1;
  next();
};

const dataMiddleware: Middleware = (ctx, next) => {
  ctx.data.result = \`data for \${ctx.data.userId}\`;
  next();
};

test('middleware chain processes request', () => {
  const app = createApp(errorHandler, authMiddleware, dataMiddleware);
  const ctx = app({ data: { token: 'valid' } });
  expect(ctx.data.userId).toBe(1);
  expect(ctx.data.result).toContain('data for 1');
  expect(ctx.error).toBeUndefined();
});

test('middleware handles auth error', () => {
  const app = createApp(errorHandler, authMiddleware, dataMiddleware);
  const ctx = app({ data: {} });
  expect(ctx.error?.message).toBe('Unauthorized');
  expect(ctx.statusCode).toBe(500);
  expect(ctx.data.result).toBeUndefined();
});
```

## Explanation

`Real` Test error propagation through a middleware chain.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

interface Context { data: any; error?: Error; statusCode?: number; }
type Middleware = (ctx: Context, next: () => void) => void;

function createApp(...middlewares: Middleware[]) {
  return function(ctx: Context) {
    let index = -1;
    function next() {
      index++;
      if (index < middlewares.length) middlewares[index](ctx, next);
    }
    next();
    return ctx;
  };
}

const errorHandler: Middleware = (ctx, next) => {
  try { next(); }
  catch (err) {
    ctx.error = err as Error;
    ctx.statusCode = 500;
  }
};

const authMiddleware: Middleware = (ctx, next) => {
  if (!ctx.data.token) throw new Error('Unauthorized');
  ctx.data.userId = 1;
  next();
};

const dataMiddleware: Middleware = (ctx, next) => {
  ctx.data.result = \`data for \${ctx.data.userId}\`;
  next();
};

test('middleware chain processes request', () => {
  const app = createApp(errorHandler, authMiddleware, dataMiddleware);
  const ctx = app({ data: { token: 'valid' } });
  // TODO: add assertion using Real-World: testing middleware error handling
  // TODO: add assertion using Real-World: testing middleware error handling
  // TODO: add assertion using Real-World: testing middleware error handling
});

test('middleware handles auth error', () => {
  const app = createApp(errorHandler, authMiddleware, dataMiddleware);
  const ctx = app({ data: {} });
  // TODO: add assertion using Real-World: testing middleware error handling
  // TODO: add assertion using Real-World: testing middleware error handling
  // TODO: add assertion using Real-World: testing middleware error handling
});
```
