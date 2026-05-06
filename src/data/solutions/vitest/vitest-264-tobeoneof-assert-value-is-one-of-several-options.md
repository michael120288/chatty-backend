# toBeOneOf — assert value is one of several options

**Level:** 264
**ID:** `vitest-264`
**XP:** 180
**Tags:** `assertions`, `equality`

## Objective

Complete the starter code using toBeOneOf so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use toBeOneOf to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test, expect } from 'vitest';

function getStatus() { return 'active'; }
function getRandomDay() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  return days[Math.floor(Math.random() * 7)];
}
function classify(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  return 'F';
}

test('getStatus returns a valid status', () => {
  expect(getStatus()).toBeOneOf(['active', 'inactive', 'pending', 'banned']);
});

test('random day is a valid day', () => {
  expect(getRandomDay()).toBeOneOf(['Mon','Tue','Wed','Thu','Fri','Sat','Sun']);
});

test('classify returns valid grade', () => {
  expect(classify(95)).toBeOneOf(['A', 'B', 'C', 'D', 'F']);
  expect(classify(75)).toBeOneOf(['A', 'B', 'C', 'D', 'F']);
  expect(classify(55)).toBeOneOf(['A', 'B', 'C', 'D', 'F']);
});

test('toBeOneOf with mixed types', () => {
  const result = Math.random() > 0.5 ? 1 : '1';
  expect(result).toBeOneOf([1, '1']);
  expect(null).toBeOneOf([null, undefined]);
});

test('not.toBeOneOf rejects invalid values', () => {
  expect('unknown').not.toBeOneOf(['active', 'inactive', 'pending']);
  expect(999).not.toBeOneOf([1, 2, 3]);
});
```

## Explanation

`toBeOneOf` toBeOneOf() passes when the received value matches any item in the provided array.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function getStatus() {
  return 'active'; // could also be 'inactive' | 'pending' | 'banned'
}

function getRandomDay() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  return days[Math.floor(Math.random() * 7)];
}

function classify(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  return 'F';
}

test('getStatus returns a valid status', () => {
  // TODO: add assertion using toBeOneOf
});

test('random day is a valid day', () => {
  const day = getRandomDay();
  // TODO: add assertion using toBeOneOf
});

test('classify returns valid grade', () => {
  // TODO: add assertion using toBeOneOf
  // TODO: add assertion using toBeOneOf
  // TODO: add assertion using toBeOneOf
});

test('toBeOneOf with mixed types', () => {
  const result = Math.random() > 0.5 ? 1 : '1';
  // TODO: add assertion using toBeOneOf
  // TODO: add assertion using toBeOneOf
});

test('not.toBeOneOf rejects invalid values', () => {
  // TODO: add assertion using toBeOneOf
  // TODO: add assertion using toBeOneOf
});
```
