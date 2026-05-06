# Advanced Patterns: expect.extend custom matcher

**Level:** 166
**ID:** `vitest-166`
**XP:** 180
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: expect.extend custom matcher so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: expect.extend custom matcher to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

expect.extend({
  toBeEven(received) {
    const pass = received % 2 === 0;
    return {
      pass,
      message: () => \`Expected \${received} to \${pass ? 'not ' : ''}be even\`,
    };
  },
});

test('custom toBeEven matcher', () => {
  expect(4).toBeEven();
  expect(2).toBeEven();
  expect(3).not.toBeEven();
  expect(7).not.toBeEven();
});
```

## Explanation

`Advanced Patterns` Add a custom matcher to extend Vitest's expect.

## Starter Code

```javascript
import { test, expect } from 'vitest';

expect.extend({
  toBeEven(received) {
    const pass = received % 2 === 0;
    return {
      pass,
      message: () => \`Expected \${received} to \${pass ? 'not ' : ''}be even\`,
    };
  },
});

test('custom toBeEven matcher', () => {
  // TODO: add assertion using Advanced Patterns: expect.extend custom matcher
  // TODO: add assertion using Advanced Patterns: expect.extend custom matcher
  // TODO: add assertion using Advanced Patterns: expect.extend custom matcher
  // TODO: add assertion using Advanced Patterns: expect.extend custom matcher
});
```
