# Snapshots: error object snapshot

**Level:** 142
**ID:** `vitest-142`
**XP:** 150
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: error object snapshot so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: error object snapshot to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

test('AppError snapshot', () => {
  const err = new AppError('Not found', 404);
  expect({ name: err.name, message: err.message, code: err.code }).toMatchSnapshot();
});
```

## Explanation

`Snapshots` lets you complete the starter code using Snapshots: error object snapshot so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

test('AppError snapshot', () => {
  const err = new AppError('Not found', 404);
  // TODO: add assertion using Snapshots: error object snapshot
});
```
