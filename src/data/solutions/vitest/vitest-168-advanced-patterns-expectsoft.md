# Advanced Patterns: expect.soft()

**Level:** 168
**ID:** `vitest-168`
**XP:** 180
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: expect.soft so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: expect.soft() to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

function validateUser(user) {
  return {
    hasName: typeof user.name === 'string' && user.name.length > 0,
    hasEmail: /^[^@]+@[^@]+/.test(user.email || ''),
    hasAge: typeof user.age === 'number' && user.age >= 0,
  };
}

test('soft assertions collect all failures', () => {
  const validation = validateUser({ name: 'Alice', email: 'alice@example.com', age: 25 });
  expect.soft(validation.hasName).toBe(true);
  expect.soft(validation.hasEmail).toBe(true);
  expect.soft(validation.hasAge).toBe(true);
});
```

## Explanation

`Advanced Patterns` Use expect.soft() to collect multiple failures in one test.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function validateUser(user) {
  return {
    hasName:  typeof user.name === 'string' && user.name.length > 0,
    hasEmail: /^[^@]+@[^@]+/.test(user.email || ''),
    hasAge:   typeof user.age === 'number' && user.age >= 0,
  };
}

test('soft assertions collect all failures', () => {
  const result = validateUser({ name: '', email: 'bad', age: -1 });
  // TODO: use expect.soft to assert result.hasName is true (will fail — that's ok)
  // TODO: use expect.soft to assert result.hasEmail is true (will fail — that's ok)
  // TODO: use expect.soft to assert result.hasAge is true (will fail — that's ok)
});

test('valid user passes all soft assertions', () => {
  const result = validateUser({ name: 'Alice', email: 'a@b.com', age: 30 });
  // TODO: use expect.soft to assert each field is true
});
```
