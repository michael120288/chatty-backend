# Table-Driven Tests: nested describe.each

**Level:** 131
**ID:** `vitest-131`
**XP:** 190
**Tags:** `parameterized`, `test.each`

## Objective

Complete the starter code using Table-Driven Tests: nested describe.each so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: nested describe.each to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { describe, test, expect } from 'vitest';

function format(value, type) {
  if (type === 'upper') return String(value).toUpperCase();
  if (type === 'lower') return String(value).toLowerCase();
  return String(value);
}

describe.each(['hello', 'world'])('format(%s)', (word) => {
  test.each([
    ['upper', word.toUpperCase()],
    ['lower', word.toLowerCase()],
  ])('with type=%s returns %s', (type, expected) => {
    expect(format(word, type)).toBe(expected);
  });
});
```

## Explanation

`Table` Nest describe.each inside another describe.each.

## Starter Code

```javascript
import { describe, test, expect } from 'vitest';

function format(value, type) {
  if (type === 'upper') return String(value).toUpperCase();
  if (type === 'lower') return String(value).toLowerCase();
  return String(value);
}

describe.each(['hello', 'world'])('format(%s)', (word) => {
  test.each([
    ['upper', word.toUpperCase()],
    ['lower', word.toLowerCase()],
  ])('as %s = %s', (type, expected) => {
    // TODO: assert format(word, type) equals expected
  });
});
```
