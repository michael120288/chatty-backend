# Coverage: testing abstract-like patterns

**Level:** 197
**ID:** `vitest-197`
**XP:** 190
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: testing abstract-like patterns so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: testing abstract-like patterns to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: testing abstract-like patterns` in your test assertions.
2. Check the Vitest docs for `Coverage: testing abstract-like patterns` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

function createSorter(strategy) {
  return {
    sort(arr) {
      switch (strategy) {
        case 'asc': return [...arr].sort((a, b) => a - b);
        case 'desc': return [...arr].sort((a, b) => b - a);
        case 'random': return [...arr].sort(() => Math.random() - 0.5);
        default: return [...arr];
      }
    }
  };
}

test('sorter strategies coverage', () => {
  const data = [3, 1, 4, 1, 5, 9, 2];
  const asc = createSorter('asc').sort(data);
  expect(asc).toEqual([1, 1, 2, 3, 4, 5, 9]);

  const desc = createSorter('desc').sort(data);
  expect(desc).toEqual([9, 5, 4, 3, 2, 1, 1]);

  const random = createSorter('random').sort(data);
  expect(random).toHaveLength(data.length);

  const passThrough = createSorter('none').sort(data);
  expect(passThrough).toEqual(data);
});
```

## Explanation

`Coverage` Test strategy pattern where different implementations are exercised.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function createSorter(strategy) {
  return {
    sort(arr) {
      switch (strategy) {
        case 'asc': return [...arr].sort((a, b) => a - b);
        case 'desc': return [...arr].sort((a, b) => b - a);
        case 'random': return [...arr].sort(() => Math.random() - 0.5);
        default: return [...arr];
      }
    }
  };
}

test('sorter strategies coverage', () => {
  const data = [3, 1, 4, 1, 5, 9, 2];
  const asc = createSorter('asc').sort(data);
  // TODO: add assertion using Coverage: testing abstract-like patterns

  const desc = createSorter('desc').sort(data);
  // TODO: add assertion using Coverage: testing abstract-like patterns

  const random = createSorter('random').sort(data);
  // TODO: add assertion using Coverage: testing abstract-like patterns

  const passThrough = createSorter('none').sort(data);
  // TODO: add assertion using Coverage: testing abstract-like patterns
});
```
