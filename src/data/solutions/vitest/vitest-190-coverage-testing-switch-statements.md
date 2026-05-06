# Coverage: testing switch statements

**Level:** 190
**ID:** `vitest-190`
**XP:** 170
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: testing switch statements so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: testing switch statements to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: testing switch statements` in your test assertions.
2. Check the Vitest docs for `Coverage: testing switch statements` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

function getStatusMessage(code) {
  switch (code) {
    case 200: return 'OK';
    case 201: return 'Created';
    case 400: return 'Bad Request';
    case 401: return 'Unauthorized';
    case 403: return 'Forbidden';
    case 404: return 'Not Found';
    case 500: return 'Internal Server Error';
    default: return 'Unknown Status';
  }
}

test('all switch cases covered', () => {
  expect(getStatusMessage(200)).toBe('OK');
  expect(getStatusMessage(201)).toBe('Created');
  expect(getStatusMessage(400)).toBe('Bad Request');
  expect(getStatusMessage(401)).toBe('Unauthorized');
  expect(getStatusMessage(403)).toBe('Forbidden');
  expect(getStatusMessage(404)).toBe('Not Found');
  expect(getStatusMessage(500)).toBe('Internal Server Error');
  expect(getStatusMessage(999)).toBe('Unknown Status');
});
```

## Explanation

`Coverage` Write tests that cover all cases in a switch statement.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function getStatusMessage(code) {
  switch (code) {
    case 200: return 'OK';
    case 201: return 'Created';
    case 400: return 'Bad Request';
    case 401: return 'Unauthorized';
    case 403: return 'Forbidden';
    case 404: return 'Not Found';
    case 500: return 'Internal Server Error';
    default: return 'Unknown Status';
  }
}

test('all switch cases covered', () => {
  // TODO: add assertion using Coverage: testing switch statements
  // TODO: add assertion using Coverage: testing switch statements
  // TODO: add assertion using Coverage: testing switch statements
  // TODO: add assertion using Coverage: testing switch statements
  // TODO: add assertion using Coverage: testing switch statements
  // TODO: add assertion using Coverage: testing switch statements
  // TODO: add assertion using Coverage: testing switch statements
  // TODO: add assertion using Coverage: testing switch statements
});
```
