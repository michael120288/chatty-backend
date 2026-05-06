# The .not Modifier

**Level:** 5
**ID:** `vitest-005`
**XP:** 100
**Tags:** `not`, `negation`, `matchers`

## Objective

Write three tests using .not to assert inequality, non-null, and non-empty.

## Story

Sometimes you must assert what something is NOT. The .not modifier inverts any matcher.

## Hints
1. expect(5).not.toBe(6)
2. expect('hello').not.toBeNull()
3. expect([1,2,3]).not.toHaveLength(0)

## Solution

```javascript
import { test, expect } from 'vitest';
test('5 is not 6', () => { expect(5).not.toBe(6); });
test('hello is not null', () => { expect('hello').not.toBeNull(); });
test('array is not empty', () => { expect([1,2,3]).not.toHaveLength(0); });
```

## Explanation

Vitest's `The .not Modifier` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('5 is not 6', () => {
  // TODO: assert 5 is not 6
});

test('hello is not null', () => {
  // TODO: assert 'hello' is not null
});

test('array is not empty', () => {
  // TODO: assert [1, 2, 3] does not have length 0
});
```
