# Advanced Patterns: custom matcher with message

**Level:** 167
**ID:** `vitest-167`
**XP:** 190
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: custom matcher with message so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: custom matcher with message to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    return {
      pass,
      message: () =>
        \`Expected \${received} to be within range [\${floor}, \${ceiling}]\`,
    };
  },
});

test('toBeWithinRange matcher', () => {
  expect(5).toBeWithinRange(1, 10);
  expect(10).toBeWithinRange(1, 10);
  expect(1).toBeWithinRange(1, 10);
  expect(0).not.toBeWithinRange(1, 10);
  expect(11).not.toBeWithinRange(1, 10);
});
```

## Explanation

`Advanced Patterns` Write a custom matcher that validates complex conditions.

## Starter Code

```javascript
import { test, expect } from 'vitest';

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    return {
      pass,
      message: () =>
        \`Expected \${received} to be within range [\${floor}, \${ceiling}]\`,
    };
  },
});

test('toBeWithinRange matcher', () => {
  // TODO: add assertion using Advanced Patterns: custom matcher with message
  // TODO: add assertion using Advanced Patterns: custom matcher with message
  // TODO: add assertion using Advanced Patterns: custom matcher with message
  // TODO: add assertion using Advanced Patterns: custom matcher with message
  // TODO: add assertion using Advanced Patterns: custom matcher with message
});
```
