# Snapshots: error message snapshot

**Level:** 147
**ID:** `vitest-147`
**XP:** 170
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: error message snapshot so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: error message snapshot to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

function validateAge(age) {
  if (typeof age !== 'number') throw new TypeError('Age must be a number');
  if (age < 0) throw new RangeError('Age cannot be negative');
  if (age > 150) throw new RangeError('Age is unrealistically large');
  return true;
}

test('validation error messages', () => {
  const getMsg = (fn) => { try { fn(); } catch(e) { return e.message; } };
  expect(getMsg(() => validateAge('old'))).toMatchInlineSnapshot(\`"Age must be a number"\`);
  expect(getMsg(() => validateAge(-1))).toMatchInlineSnapshot(\`"Age cannot be negative"\`);
  expect(getMsg(() => validateAge(200))).toMatchInlineSnapshot(\`"Age is unrealistically large"\`);
});
```

## Explanation

`Snapshots` Snapshot error messages thrown by validation functions.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function validateAge(age) {
  if (typeof age !== 'number') throw new TypeError('Age must be a number');
  if (age < 0) throw new RangeError('Age cannot be negative');
  if (age > 150) throw new RangeError('Age is unrealistically large');
  return true;
}

test('validation error messages', () => {
  const getMsg = (fn) => { try { fn(); } catch(e) { return e.message; } };
  // TODO: add assertion using Snapshots: error message snapshot
  // TODO: add assertion using Snapshots: error message snapshot
  // TODO: add assertion using Snapshots: error message snapshot
});
```
