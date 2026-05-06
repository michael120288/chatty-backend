# Advanced Patterns: asymmetric matchers

**Level:** 178
**ID:** `vitest-178`
**XP:** 190
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: asymmetric matchers so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: asymmetric matchers to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

function createEvent(type, payload) {
  return {
    id: Math.random().toString(36),
    type,
    payload,
    timestamp: Date.now(),
    version: '1.0',
  };
}

test('asymmetric matchers', () => {
  const event = createEvent('user:login', { userId: 42 });
  expect(event).toEqual(
    expect.objectContaining({
      type: 'user:login',
      payload: expect.objectContaining({ userId: 42 }),
      version: '1.0',
    })
  );
  expect(['a', 'b', 'c']).toEqual(expect.arrayContaining(['a', 'c']));
});
```

## Explanation

`Advanced Patterns` Use expect.objectContaining and expect.arrayContaining.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function createEvent(type, payload) {
  return {
    id: Math.random().toString(36),
    type,
    payload,
    timestamp: Date.now(),
    version: '1.0',
  };
}

test('asymmetric matchers', () => {
  const event = createEvent('user:login', { userId: 42 });
  // TODO: add assertion using Advanced Patterns: asymmetric matchers
    expect.objectContaining({
      type: 'user:login',
      payload: expect.objectContaining({ userId: 42 }),
      version: '1.0',
    })
  );
  // TODO: add assertion using Advanced Patterns: asymmetric matchers
});
```
