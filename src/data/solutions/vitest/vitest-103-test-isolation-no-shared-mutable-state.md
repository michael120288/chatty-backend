# Test Isolation — No Shared Mutable State

**Level:** 103
**ID:** `vitest-103`
**XP:** 100
**Tags:** `isolation`, `mutable-state`, `beforeEach`

## Objective

Demonstrate how shared mutable state causes test pollution and how to fix it.

## Story

Tests that share mutable state bleed into each other. Isolate properly.

## Hints
1. beforeEach(() => { items = []; }) resets the array.
2. Each test gets a fresh empty array.

## Solution

```javascript
import { test, expect, beforeEach } from 'vitest';
let items;
beforeEach(() => { items = []; });
test('add item', () => { items.push('apple'); expect(items).toHaveLength(1); });
test('starts empty', () => { expect(items).toHaveLength(0); });
test('two items', () => { items.push('x'); items.push('y'); expect(items).toHaveLength(2); });
```

## Explanation

Vitest's `Test Isolation` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, beforeEach } from 'vitest';

// BAD: top-level mutable array
// const items = []; // ← don't do this across tests

// GOOD: reset in beforeEach
let items;
beforeEach(() => {
  // TODO: Reset items to an empty array
});

test('can add item', () => {
  items.push('apple');
  expect(items).toHaveLength(1);
});

test('starts empty (isolated)', () => {
  // TODO: Assert items is empty even though previous test added 'apple'
});

test('another isolated test', () => {
  items.push('x'); items.push('y');
  expect(items).toHaveLength(2);
});
```
