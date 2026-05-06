# toBeNullable — assert null or undefined

**Level:** 263
**ID:** `vitest-263`
**XP:** 170
**Tags:** `assertions`, `null`

## Objective

Complete the starter code using toBeNullable so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use toBeNullable to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test, expect } from 'vitest';

function findUser(id) {
  const db = { 1: 'Alice', 2: 'Bob' };
  return db[id] ?? null;
}

function getOptionalField(obj, key) {
  return obj[key];
}

test('toBeNullable passes for null', () => {
  expect(null).toBeNullable();
  expect(findUser(99)).toBeNullable();
});

test('toBeNullable passes for undefined', () => {
  expect(undefined).toBeNullable();
  expect(getOptionalField({}, 'missing')).toBeNullable();
});

test('toBeNullable fails for real values', () => {
  expect('hello').not.toBeNullable();
  expect(0).not.toBeNullable();
  expect(false).not.toBeNullable();
  expect([]).not.toBeNullable();
  expect(findUser(1)).not.toBeNullable();
});

test('optional object fields', () => {
  const user = { name: 'Alice', nickname: null, age: undefined };
  expect(user.nickname).toBeNullable();
  expect(user.age).toBeNullable();
  expect(user.name).not.toBeNullable();
});
```

## Explanation

`toBeNullable` toBeNullable() passes for both null and undefined — useful when a value can be either.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function findUser(id) {
  const db = { 1: 'Alice', 2: 'Bob' };
  return db[id] ?? null;
}

function getOptionalField(obj, key) {
  return obj[key]; // may be undefined
}

test('toBeNullable passes for null', () => {
  // TODO: add assertion using toBeNullable
  // TODO: add assertion using toBeNullable
});

test('toBeNullable passes for undefined', () => {
  // TODO: add assertion using toBeNullable
  // TODO: add assertion using toBeNullable
});

test('toBeNullable fails for real values', () => {
  // TODO: add assertion using toBeNullable
  // TODO: add assertion using toBeNullable
  // TODO: add assertion using toBeNullable
  // TODO: add assertion using toBeNullable
  // TODO: add assertion using toBeNullable
});

test('optional object fields', () => {
  const user = { name: 'Alice', nickname: null, age: undefined };
  // TODO: add assertion using toBeNullable
  // TODO: add assertion using toBeNullable
  // TODO: add assertion using toBeNullable
});
```
