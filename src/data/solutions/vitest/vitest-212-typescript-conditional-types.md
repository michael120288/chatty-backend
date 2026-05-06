# TypeScript: conditional types

**Level:** 212
**ID:** `vitest-212`
**XP:** 200
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: conditional types so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: conditional types to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

function flattenOne<T>(value: T | T[]): T {
  if (Array.isArray(value)) return value[0] as T;
  return value;
}

function isArrayValue(value: unknown): boolean {
  return Array.isArray(value);
}

test('runtime array checks', () => {
  expect(isArrayValue([1, 2, 3])).toBe(true);
  expect(isArrayValue('string')).toBe(false);
  expect(isArrayValue(42)).toBe(false);
});

test('flattenOne removes one layer', () => {
  expect(flattenOne([1, 2, 3])).toBe(1);
  expect(flattenOne('hello')).toBe('hello');
  expect(flattenOne(42)).toBe(42);
});
```

## Explanation

`TypeScript` Test code that uses TypeScript conditional types.

## Starter Code

```javascript
import { test, expect } from 'vitest';

type IsArray<T> = T extends any[] ? true : false;
type Flatten<T> = T extends Array<infer U> ? U : T;

function flattenOne<T>(value: T): Flatten<T> {
  if (Array.isArray(value)) return value[0] as Flatten<T>;
  return value as Flatten<T>;
}

function isArrayValue(value: unknown): boolean {
  return Array.isArray(value);
}

test('runtime array checks', () => {
  // TODO: add assertion using TypeScript: conditional types
  // TODO: add assertion using TypeScript: conditional types
  // TODO: add assertion using TypeScript: conditional types
});

test('flattenOne removes one layer', () => {
  // TODO: add assertion using TypeScript: conditional types
  // TODO: add assertion using TypeScript: conditional types
  // TODO: add assertion using TypeScript: conditional types
});
```
