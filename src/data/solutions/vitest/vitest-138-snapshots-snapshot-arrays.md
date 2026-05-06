# Snapshots: snapshot arrays

**Level:** 138
**ID:** `vitest-138`
**XP:** 150
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: snapshot arrays so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: snapshot arrays to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

function getTopItems(items, n) {
  return [...items].sort((a, b) => b.score - a.score).slice(0, n);
}

test('top 3 items snapshot', () => {
  const items = [
    { name: 'C', score: 70 },
    { name: 'A', score: 95 },
    { name: 'B', score: 80 },
    { name: 'D', score: 60 },
  ];
  expect(getTopItems(items, 3)).toMatchSnapshot();
});
```

## Explanation

`Snapshots` Snapshot an array result for regression testing.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function getTopItems(items, n) {
  return [...items].sort((a, b) => b.score - a.score).slice(0, n);
}

test('top 3 items snapshot', () => {
  const items = [
    { name: 'C', score: 70 },
    { name: 'A', score: 95 },
    { name: 'B', score: 80 },
    { name: 'D', score: 60 },
  ];
  // TODO: add assertion using Snapshots: snapshot arrays
});
```
