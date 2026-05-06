# Snapshots: toMatchSnapshot with complex transform

**Level:** 146
**ID:** `vitest-146`
**XP:** 170
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: toMatchSnapshot with complex transform so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: toMatchSnapshot with complex transform to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

function pipeline(users) {
  return users
    .filter(u => u.active)
    .map(u => ({ id: u.id, displayName: u.name.trim(), tier: u.score >= 100 ? 'gold' : 'silver' }))
    .sort((a, b) => a.id - b.id);
}

test('pipeline snapshot', () => {
  const users = [
    { id: 3, name: '  Carol  ', active: true, score: 150 },
    { id: 1, name: 'Alice', active: false, score: 50 },
    { id: 2, name: 'Bob ', active: true, score: 80 },
  ];
  expect(pipeline(users)).toMatchSnapshot();
});
```

## Explanation

`Snapshots` Snapshot a complex data transformation pipeline.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function pipeline(users) {
  return users
    .filter(u => u.active)
    .map(u => ({ id: u.id, displayName: u.name.trim(), tier: u.score >= 100 ? 'gold' : 'silver' }))
    .sort((a, b) => a.id - b.id);
}

test('pipeline snapshot', () => {
  const users = [
    { id: 3, name: '  Carol  ', active: true, score: 150 },
    { id: 1, name: 'Alice', active: false, score: 50 },
    { id: 2, name: 'Bob ', active: true, score: 80 },
  ];
  // TODO: add assertion using Snapshots: toMatchSnapshot with complex transform
});
```
