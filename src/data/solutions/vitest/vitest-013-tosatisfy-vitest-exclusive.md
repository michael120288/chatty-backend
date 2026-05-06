# toSatisfy — Vitest Exclusive

**Level:** 13
**ID:** `vitest-013`
**XP:** 100
**Tags:** `toSatisfy`, `predicate`, `vitest-exclusive`

## Objective

Use toSatisfy() to assert a value satisfies a custom predicate.

## Story

Vitest adds toSatisfy: pass any predicate function as the matcher.

## Hints
1. toSatisfy(fn) — fn receives the value and returns true/false.
2. expect(4).toSatisfy(n => n % 2 === 0)

## Solution

```javascript
import { test, expect } from 'vitest';
test('number is even', () => {
  expect(4).toSatisfy(n => n % 2 === 0);
});
test('string starts with hello', () => {
  expect('hello world').toSatisfy(s => s.startsWith('hello'));
});
```

## Explanation

Vitest's `toSatisfy` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('number is even', () => {
  // TODO: expect(4).toSatisfy with an isEven predicate
});

test('string starts with hello', () => {
  // TODO: expect('hello world').toSatisfy with a startsWithHello predicate
});
```
