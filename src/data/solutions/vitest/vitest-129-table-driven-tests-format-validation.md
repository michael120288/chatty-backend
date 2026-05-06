# Table-Driven Tests: format validation

**Level:** 129
**ID:** `vitest-129`
**XP:** 160
**Tags:** `table`, `driven`

## Objective

Complete the starter code using Table-Driven Tests: format validation so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: format validation to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { test, expect } from 'vitest';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

test.each([
  ['user@example.com', true],
  ['invalid-email', false],
  ['user@', false],
  ['@domain.com', false],
  ['user@domain.co.uk', true],
  ['', false],
])('isValidEmail(%s) = %s', (email, expected) => {
  expect(isValidEmail(email)).toBe(expected);
});
```

## Explanation

`Table` Validate multiple input formats with test.each.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

test.each([
  ['user@example.com',   true],
  ['invalid-email',      false],
  ['user@',              false],
  ['@domain.com',        false],
  ['user@domain.co.uk',  true],
  ['',                   false],
])('isValidEmail(%s) = %s', (email, expected) => {
  // TODO: assert isValidEmail(email) equals expected
});
```
