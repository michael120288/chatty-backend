# Test Context: test.extend basics

**Level:** 151
**ID:** `vitest-151`
**XP:** 160
**Tags:** `test.extend`, `fixtures`, `context`

## Objective

Use `test.extend()` to consume a fixture and write assertions against the value it provides.

## Story

A fixture has already been set up that provides a greeting string. Your job is to write the assertions that verify it — the setup is done for you.

## Hints
1. The fixture `greeting` is already set up above — destructure it from the test callback: `test('...', ({ greeting }) => { ... })`.
2. `expect(greeting).toBe('Hello, World!')` — assert the exact string value provided by `await use(...)`.
3. `expect(typeof greeting).toBe('string')` — `typeof` returns a string, so wrap it: `expect(typeof greeting)`.

## Solution

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  greeting: async ({}, use) => {
    await use('Hello, World!');
  },
});

test('greeting fixture is available', ({ greeting }) => {
  expect(greeting).toBe('Hello, World!');
  expect(typeof greeting).toBe('string');
});
```

## Explanation

`test.extend()` lets you create fixtures — values that are set up before each test and torn down after. The fixture function calls `await use(value)` to provide the value to the test. Inside the test, destructure the fixture by name from the first argument: `({ greeting })`. Then use it like any variable:

```
test('greeting fixture is available', ({ greeting }) => {
  expect(greeting).toBe('Hello, World!');
  expect(typeof greeting).toBe('string');
});
```

## Starter Code

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  greeting: async ({}, use) => {
    await use('Hello, World!');
  },
});

test('greeting fixture is available', ({ greeting }) => {
  // TODO: assert that greeting equals 'Hello, World!' (use .toBe('Hello, World!'))
  // TODO: assert that typeof greeting equals 'string' (use .toBe('string'))
});
```
