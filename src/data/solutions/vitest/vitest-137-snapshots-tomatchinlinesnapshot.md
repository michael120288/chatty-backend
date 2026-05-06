# Snapshots: toMatchInlineSnapshot

**Level:** 137
**ID:** `vitest-137`
**XP:** 150
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: toMatchInlineSnapshot so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: toMatchInlineSnapshot to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

function formatPrice(cents) {
  return \`$\${(cents / 100).toFixed(2)}\`;
}

test('formatPrice inline snapshot', () => {
  expect(formatPrice(1999)).toMatchInlineSnapshot(\`"$19.99"\`);
  expect(formatPrice(0)).toMatchInlineSnapshot(\`"$0.00"\`);
  expect(formatPrice(100)).toMatchInlineSnapshot(\`"$1.00"\`);
});
```

## Explanation

`Snapshots` Use inline snapshots to embed expected output in the test file.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function formatPrice(cents) {
  return \`$\${(cents / 100).toFixed(2)}\`;
}

test('formatPrice inline snapshot', () => {
  // TODO: add assertion using Snapshots: toMatchInlineSnapshot
  // TODO: add assertion using Snapshots: toMatchInlineSnapshot
  // TODO: add assertion using Snapshots: toMatchInlineSnapshot
});
```
