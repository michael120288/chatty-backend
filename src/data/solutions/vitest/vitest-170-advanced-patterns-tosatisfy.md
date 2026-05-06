# Advanced Patterns: toSatisfy()

**Level:** 170
**ID:** `vitest-170`
**XP:** 180
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: toSatisfy so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: toSatisfy() to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

function getUser(id) {
  return { id, name: 'User ' + id, createdAt: new Date().toISOString() };
}

test('toSatisfy with predicate', () => {
  const user = getUser(5);
  expect(user).toSatisfy(u => u.id > 0);
  expect(user).toSatisfy(u => u.name.startsWith('User'));
  expect(user).toSatisfy(u => typeof u.createdAt === 'string');
  expect(user).not.toSatisfy(u => u.id < 0);
});
```

## Explanation

`Advanced Patterns` Use toSatisfy() with a predicate function.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function getUser(id) {
  return { id, name: 'User ' + id, createdAt: new Date().toISOString() };
}

test('toSatisfy with predicate', () => {
  const user = getUser(5);
  // TODO: add assertion using Advanced Patterns: toSatisfy
  // TODO: add assertion using Advanced Patterns: toSatisfy
  // TODO: add assertion using Advanced Patterns: toSatisfy
  // TODO: add assertion using Advanced Patterns: toSatisfy
});
```
