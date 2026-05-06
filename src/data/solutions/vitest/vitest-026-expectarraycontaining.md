# expect.arrayContaining

**Level:** 26
**ID:** `vitest-026`
**XP:** 100
**Tags:** `arrayContaining`, `arrays`, `subset`

## Objective

Use expect.arrayContaining to check array subset membership.

## Story

The treasure chest must contain certain items — extra items are fine.

## Hints
1. expect(array).toEqual(expect.arrayContaining(['gold', 'potion']))
2. Order does not matter with arrayContaining.

## Solution

```javascript
import { test, expect } from 'vitest';
test('loot contains gold and potion', () => {
  expect(['gold','sword','potion','map']).toEqual(expect.arrayContaining(['gold','potion']));
});
test('roles include admin', () => {
  expect(['user','admin','moderator']).toEqual(expect.arrayContaining(['admin']));
});
```

## Explanation

Vitest's `expect.arrayContaining` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('array contains required items', () => {
  const loot = ['gold', 'sword', 'potion', 'map'];
  // TODO: Assert loot contains at least ['gold', 'potion']
});

test('roles include admin', () => {
  const roles = ['user', 'admin', 'moderator'];
  // TODO: Assert roles contains ['admin']
});
```
