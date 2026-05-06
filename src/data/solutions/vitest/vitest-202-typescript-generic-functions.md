# TypeScript: generic functions

**Level:** 202
**ID:** `vitest-202`
**XP:** 190
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: generic functions so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: generic functions to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

function pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map(item => item[key]);
}

test('generic first/last functions', () => {
  expect(first([1, 2, 3])).toBe(1);
  expect(last([1, 2, 3])).toBe(3);
  expect(first([])).toBeUndefined();
  expect(last([])).toBeUndefined();
});

test('generic pluck function', () => {
  const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
  expect(pluck(users, 'name')).toEqual(['Alice', 'Bob']);
  expect(pluck(users, 'id')).toEqual([1, 2]);
});
```

## Explanation

`TypeScript` Test generic utility functions with TypeScript.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

function pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map(item => item[key]);
}

test('generic first/last functions', () => {
  // TODO: add assertion using TypeScript: generic functions
  // TODO: add assertion using TypeScript: generic functions
  // TODO: add assertion using TypeScript: generic functions
  // TODO: add assertion using TypeScript: generic functions
});

test('generic pluck function', () => {
  const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
  // TODO: add assertion using TypeScript: generic functions
  // TODO: add assertion using TypeScript: generic functions
});
```
