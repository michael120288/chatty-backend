# TypeScript: Boss Level — generic pipeline

**Level:** 215
**ID:** `vitest-215`
**XP:** 250
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: Boss Level so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: Boss Level to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

type Transform<A, B> = (input: A) => B;

class Pipeline<T> {
  constructor(private value: T) {}

  pipe<U>(fn: Transform<T, U>): Pipeline<U> {
    return new Pipeline(fn(this.value));
  }

  result(): T { return this.value; }
}

function pipe<T>(value: T): Pipeline<T> {
  return new Pipeline(value);
}

test('generic pipeline transforms', () => {
  const result = pipe(5)
    .pipe(n => n * 2)
    .pipe(n => n + 1)
    .pipe(String)
    .pipe(s => s.padStart(4, '0'))
    .result();

  expect(result).toBe('0011');
});

test('pipeline with object transforms', () => {
  const result = pipe({ name: '  Alice  ', score: 42 })
    .pipe(u => ({ ...u, name: u.name.trim() }))
    .pipe(u => ({ ...u, grade: u.score >= 40 ? 'pass' : 'fail' }))
    .result();

  expect(result.name).toBe('Alice');
  expect(result.grade).toBe('pass');
});
```

## Explanation

`TypeScript` Build and test a generic transformation pipeline.

## Starter Code

```javascript
import { test, expect } from 'vitest';

type Transform<A, B> = (input: A) => B;

class Pipeline<T> {
  constructor(private value: T) {}

  pipe<U>(fn: Transform<T, U>): Pipeline<U> {
    return new Pipeline(fn(this.value));
  }

  result(): T { return this.value; }
}

function pipe<T>(value: T): Pipeline<T> {
  return new Pipeline(value);
}

test('generic pipeline transforms', () => {
  const result = pipe(5)
    .pipe(n => n * 2)
    .pipe(n => n + 1)
    .pipe(String)
    .pipe(s => s.padStart(4, '0'))
    .result();

  // TODO: add assertion using TypeScript: Boss Level
});

test('pipeline with object transforms', () => {
  const result = pipe({ name: '  Alice  ', score: 42 })
    .pipe(u => ({ ...u, name: u.name.trim() }))
    .pipe(u => ({ ...u, grade: u.score >= 40 ? 'pass' : 'fail' }))
    .result();

  // TODO: add assertion using TypeScript: Boss Level
  // TODO: add assertion using TypeScript: Boss Level
});
```
