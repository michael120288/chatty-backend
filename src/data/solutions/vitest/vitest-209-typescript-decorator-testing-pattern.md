# TypeScript: decorator testing pattern

**Level:** 209
**ID:** `vitest-209`
**XP:** 200
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: decorator testing pattern so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: decorator testing pattern to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  return function(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  } as T;
}

test('memoize caches results', () => {
  let callCount = 0;
  const expensiveCalc = memoize((n: number) => {
    callCount++;
    return n * n;
  });

  expect(expensiveCalc(5)).toBe(25);
  expect(expensiveCalc(5)).toBe(25);
  expect(expensiveCalc(3)).toBe(9);
  expect(callCount).toBe(2);
});
```

## Explanation

`TypeScript` Test classes that use decorator-like patterns.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  return function(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  } as T;
}

test('memoize caches results', () => {
  let callCount = 0;
  const expensiveCalc = memoize((n: number) => {
    callCount++;
    return n * n;
  });

  // TODO: add assertion using TypeScript: decorator testing pattern
  // TODO: add assertion using TypeScript: decorator testing pattern
  // TODO: add assertion using TypeScript: decorator testing pattern
  // TODO: add assertion using TypeScript: decorator testing pattern
});
```
