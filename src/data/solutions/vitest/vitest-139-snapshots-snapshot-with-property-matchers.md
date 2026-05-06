# Snapshots: snapshot with property matchers

**Level:** 139
**ID:** `vitest-139`
**XP:** 170
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: snapshot with property matchers so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: snapshot with property matchers to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

function createSession(userId) {
  return {
    userId,
    sessionId: Math.random().toString(36).slice(2),
    createdAt: new Date().toISOString(),
  };
}

test('createSession snapshot with matchers', () => {
  const session = createSession(42);
  expect(session).toMatchSnapshot({
    sessionId: expect.any(String),
    createdAt: expect.any(String),
  });
});
```

## Explanation

`Snapshots` Use asymmetric matchers inside snapshots to handle dynamic values.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function createSession(userId) {
  return {
    userId,
    sessionId: Math.random().toString(36).slice(2),
    createdAt: new Date().toISOString(),
  };
}

test('createSession snapshot with matchers', () => {
  const session = createSession(42);
  // TODO: add assertion using Snapshots: snapshot with property matchers
    sessionId: expect.any(String),
    createdAt: expect.any(String),
  });
});
```
