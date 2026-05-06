# Real-World: testing functional composition

**Level:** 250
**ID:** `vitest-250`
**XP:** 280
**Tags:** `integration`, `patterns`

## Objective

Complete the starter code using Real-World: testing functional composition so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing functional composition to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

const compose = <T>(...fns: Array<(x: T) => T>) =>
  (x: T): T => fns.reduceRight((v, f) => f(v), x);

const pipe = <T>(...fns: Array<(x: T) => T>) =>
  (x: T): T => fns.reduce((v, f) => f(v), x);

const trim = (s: string) => s.trim();
const lower = (s: string) => s.toLowerCase();
const slug = (s: string) => s.replace(/\s+/g, '-');
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

test('compose applies functions right to left', () => {
  const toSlug = compose(slug, lower, trim);
  expect(toSlug('  Hello World  ')).toBe('hello-world');
});

test('pipe applies functions left to right', () => {
  const toTitle = pipe(trim, lower, cap);
  expect(toTitle('  hELLO wORLD  ')).toBe('Hello world');
});

test('compose and pipe are inverse operations', () => {
  const data = '  TEST DATA  ';
  const pipeline = pipe(trim, lower);
  const composition = compose(lower, trim);
  expect(pipeline(data)).toBe(composition(data));
});
```

## Explanation

`Real` Test a compose/pipe function with various transformations.

## Starter Code

```javascript
import { test, expect } from 'vitest';

const compose = <T>(...fns: Array<(x: T) => T>) =>
  (x: T): T => fns.reduceRight((v, f) => f(v), x);

const pipe = <T>(...fns: Array<(x: T) => T>) =>
  (x: T): T => fns.reduce((v, f) => f(v), x);

const trim = (s: string) => s.trim();
const lower = (s: string) => s.toLowerCase();
const slug = (s: string) => s.replace(/\s+/g, '-');
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

test('compose applies functions right to left', () => {
  const toSlug = compose(slug, lower, trim);
  // TODO: add assertion using Real-World: testing functional composition
});

test('pipe applies functions left to right', () => {
  const toTitle = pipe(trim, lower, cap);
  // TODO: add assertion using Real-World: testing functional composition
});

test('compose and pipe are inverse operations', () => {
  const data = '  TEST DATA  ';
  const pipeline = pipe(trim, lower);
  const composition = compose(lower, trim);
  // TODO: add assertion using Real-World: testing functional composition
});
```
