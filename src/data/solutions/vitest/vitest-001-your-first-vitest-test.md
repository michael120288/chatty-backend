# Your First Vitest Test

**Level:** 1
**ID:** `vitest-001`
**XP:** 100
**Tags:** `test`, `expect`, `toBe`, `basics`

## Objective

Write a Vitest test that asserts 1 + 1 equals 2 using .toBe().

## Story

You enter the Vitest Arena. The first trial is simple: prove that 1 + 1 is 2.

## Hints
1. Use expect(value).toBe(expected) for strict equality.
2. expect(1 + 1).toBe(2)

## Solution

```javascript
import { test, expect } from 'vitest';
test('one plus one equals two', () => {
  expect(1 + 1).toBe(2);
});
```

## Explanation

Vitest's `Your First Vitest Test` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('one plus one equals two', () => {
  // TODO: Assert that 1 + 1 equals 2 using .toBe()
});
```
