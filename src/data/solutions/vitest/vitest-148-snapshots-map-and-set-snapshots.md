# Snapshots: map and set snapshots

**Level:** 148
**ID:** `vitest-148`
**XP:** 160
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: map and set snapshots so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: map and set snapshots to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

function buildIndex(items) {
  const map = new Map();
  items.forEach(item => map.set(item.id, item.name));
  return map;
}

test('Map snapshot', () => {
  const index = buildIndex([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);
  expect(Array.from(index.entries())).toMatchSnapshot();
});
```

## Explanation

`Snapshots` lets you complete the starter code using Snapshots: map and set snapshots so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function buildIndex(items) {
  const map = new Map();
  items.forEach(item => map.set(item.id, item.name));
  return map;
}

test('Map snapshot', () => {
  const index = buildIndex([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);
  // TODO: add assertion using Snapshots: map and set snapshots
});
```
