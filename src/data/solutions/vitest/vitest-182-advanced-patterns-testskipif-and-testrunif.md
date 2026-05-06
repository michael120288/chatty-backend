# Advanced Patterns: test.skipIf and test.runIf

**Level:** 182
**ID:** `vitest-182`
**XP:** 180
**Tags:** `test variants`, `skipping`

## Objective

Complete the starter code using Advanced Patterns: test.skipIf and test.runIf so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: test.skipIf and test.runIf to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

const isCI = process.env.CI === 'true';
const nodeVersion = parseInt(process.version.slice(1));

test.skipIf(isCI)('skip in CI environment', () => {
  expect(true).toBe(true);
});

test.runIf(nodeVersion >= 14)('run on Node 14+', () => {
  expect(nodeVersion).toBeGreaterThanOrEqual(14);
});

test('always runs', () => {
  expect(1 + 1).toBe(2);
});
```

## Explanation

`Advanced Patterns` Conditionally run tests based on environment.

## Starter Code

```javascript
import { test, expect } from 'vitest';

const isCI = process.env.CI === 'true';
const nodeVersion = parseInt(process.version.slice(1));

test.skipIf(isCI)('skip in CI environment', () => {
  // TODO: add assertion using Advanced Patterns: test.skipIf and test.runIf
});

test.runIf(nodeVersion >= 14)('run on Node 14+', () => {
  // TODO: add assertion using Advanced Patterns: test.skipIf and test.runIf
});

test('always runs', () => {
  // TODO: add assertion using Advanced Patterns: test.skipIf and test.runIf
});
```
