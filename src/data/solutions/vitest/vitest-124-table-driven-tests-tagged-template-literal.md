# Table-Driven Tests: tagged template literal

**Level:** 124
**ID:** `vitest-124`
**XP:** 170
**Tags:** `table`, `driven`

## Objective

Complete the starter code using Table-Driven Tests: tagged template literal so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: tagged template literal to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { test, expect } from 'vitest';

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

test.each\`
  n     | expected
  \${2}  | \${true}
  \${3}  | \${true}
  \${4}  | \${false}
  \${7}  | \${true}
  \${9}  | \${false}
\`('isPrime($n) = $expected', ({ n, expected }) => {
  expect(isPrime(n)).toBe(expected);
});
```

## Explanation

`Table` Use tagged template literal syntax for test.each.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

test.each`
  n     | expected
  ${2}  | ${true}
  ${3}  | ${true}
  ${4}  | ${false}
  ${7}  | ${true}
  ${9}  | ${false}
`('isPrime($n) === $expected', ({ n, expected }) => {
  // TODO: assert that isPrime(n) equals expected
});
```
