# toMatch with Regex and String

**Level:** 19
**ID:** `vitest-019`
**XP:** 100
**Tags:** `toMatch`, `regex`, `strings`

## Objective

Use toMatch with a regex and with a substring.

## Story

A scroll contains a secret code. Match it using toMatch.

## Hints
1. expect(email).toMatch(/@example\.com$/)
2. expect(msg).toMatch('Hello')

## Solution

```javascript
import { test, expect } from 'vitest';
test('email matches pattern', () => {
  expect('user@example.com').toMatch(/@example\.com$/);
});
test('greeting contains hello', () => {
  expect('Hello, World!').toMatch('Hello');
});
```

## Explanation

Vitest's `toMatch with Regex and String` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('email matches pattern', () => {
  const email = 'user@example.com';
  // TODO: Assert email matches /@example\.com$/
});

test('greeting contains hello', () => {
  const msg = 'Hello, World!';
  // TODO: Assert msg contains 'Hello'
});
```
