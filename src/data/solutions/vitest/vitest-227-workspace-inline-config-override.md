# Workspace: inline config override

**Level:** 227
**ID:** `vitest-227`
**XP:** 190
**Tags:** `configuration`, `workspaces`

## Objective

Complete the starter code using Workspace: inline config override so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: inline config override to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { test, expect } from 'vitest';

function computeHeavy(n: number): number {
  let result = 0;
  for (let i = 0; i < n; i++) result += Math.sqrt(i);
  return Math.round(result * 100) / 100;
}

test('heavy computation completes', { timeout: 10000 }, () => {
  const result = computeHeavy(100000);
  expect(result).toBeGreaterThan(0);
  expect(typeof result).toBe('number');
});

test('standard computation', () => {
  expect(computeHeavy(10)).toBeCloseTo(22.47, 1);
});
```

## Explanation

`Workspace` Use inline test config options for specific tests.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function computeHeavy(n: number): number {
  let result = 0;
  for (let i = 0; i < n; i++) result += Math.sqrt(i);
  return Math.round(result * 100) / 100;
}

test('heavy computation completes', { timeout: 10000 }, () => {
  const result = computeHeavy(100000);
  // TODO: add assertion using Workspace: inline config override
  // TODO: add assertion using Workspace: inline config override
});

test('standard computation', () => {
  // TODO: add assertion using Workspace: inline config override
});
```
