# Snapshots: toMatchSnapshot basics

**Level:** 136
**ID:** `vitest-136`
**XP:** 140
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: toMatchSnapshot basics so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: toMatchSnapshot basics to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

function renderUser(user) {
  return { id: user.id, name: user.name.trim(), role: user.role || 'user' };
}

test('renderUser matches snapshot', () => {
  const result = renderUser({ id: 1, name: '  Alice  ', role: 'admin' });
  expect(result).toMatchSnapshot();
});
```

## Explanation

`Snapshots` Use toMatchSnapshot to capture and compare output.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function renderUser(user) {
  return { id: user.id, name: user.name.trim(), role: user.role || 'user' };
}

test('renderUser matches snapshot', () => {
  const result = renderUser({ id: 1, name: '  Alice  ', role: 'admin' });
  // TODO: add assertion using Snapshots: toMatchSnapshot basics
});
```
