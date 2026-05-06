# expect.unreachable — assert a code path never executes

**Level:** 270
**ID:** `vitest-270`
**XP:** 200
**Tags:** `assertions`, `control flow`

## Objective

Complete the starter code using expect.unreachable so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use expect.unreachable to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test, expect } from 'vitest';

function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

function processStatus(status) {
  switch (status) {
    case 'active': return 'User is active';
    case 'banned': return 'User is banned';
    default:
      expect.unreachable(\`Unhandled status: \${status}\`);
  }
}

test('unreachable is not triggered in the happy path', () => {
  expect(divide(10, 2)).toBe(5);
  expect(divide(7, 3)).toBeCloseTo(2.333, 3);
});

test('unreachable in switch default catches bad status', () => {
  expect(processStatus('active')).toBe('User is active');
  expect(processStatus('banned')).toBe('User is banned');
});

test('expect.unreachable throws if reached', () => {
  expect(() => {
    expect.unreachable('This should never run');
  }).toThrow();
});

test('unreachable in catch block validates error types', () => {
  try {
    divide(1, 0);
    expect.unreachable('Should have thrown before reaching here');
  } catch (e) {
    expect(e.message).toBe('Division by zero');
  }
});
```

## Explanation

`expect.unreachable` Call expect.unreachable() in a code path that must never be reached. If it is reached, the test fails.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

function processStatus(status) {
  switch (status) {
    case 'active': return 'User is active';
    case 'banned': return 'User is banned';
    default:
      expect.unreachable(\`Unhandled status: \${status}\`);
  }
}

test('unreachable is not triggered in the happy path', () => {
  // divide never calls unreachable when b != 0
  // TODO: add assertion using expect.unreachable
  // TODO: add assertion using expect.unreachable
});

test('unreachable in switch default catches bad status', () => {
  // TODO: add assertion using expect.unreachable
  // TODO: add assertion using expect.unreachable
});

test('expect.unreachable throws if reached', () => {
  // TODO: add assertion using expect.unreachable
});

test('unreachable in catch block validates error types', () => {
  try {
    divide(1, 0);
    expect.unreachable('Should have thrown before reaching here');
  } catch (e) {
    // TODO: add assertion using expect.unreachable
  }
});
```
