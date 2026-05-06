# Async Generator

**Level:** 44
**ID:** `vitest-044`
**XP:** 100
**Tags:** `async-generator`, `for-await`, `iterators`

## Objective

Test an async generator by iterating it and collecting results.

## Story

An async generator yields values over time. Collect and test them.

## Hints
1. for await (const val of countUp(3)) { results.push(val); }
2. expect(results).toEqual([1, 2, 3])

## Solution

```javascript
import { test, expect } from 'vitest';
async function* countUp(limit) { for (let i=1;i<=limit;i++) yield i; }
test('countUp', async () => {
  const results = [];
  for await (const val of countUp(3)) results.push(val);
  expect(results).toEqual([1, 2, 3]);
});
```

## Explanation

Vitest's `Async Generator` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function* countUp(limit) {
  for (let i = 1; i <= limit; i++) {
    yield i;
  }
}

test('countUp yields 1, 2, 3', async () => {
  const results = [];
  // TODO: for await...of countUp(3), push to results
  // Assert results equals [1, 2, 3]
});
```
