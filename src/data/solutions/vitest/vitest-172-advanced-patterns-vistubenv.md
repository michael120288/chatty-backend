# Advanced Patterns: vi.stubEnv()

**Level:** 172
**ID:** `vitest-172`
**XP:** 190
**Tags:** `stubs`, `environment`

## Objective

Complete the starter code using Advanced Patterns: vi.stubEnv so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: vi.stubEnv() to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

function getEnvironment() {
  return process.env.NODE_ENV || 'development';
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

test('stub NODE_ENV to production', () => {
  vi.stubEnv('NODE_ENV', 'production');
  expect(getEnvironment()).toBe('production');
  expect(isProduction()).toBe(true);
  vi.unstubAllEnvs();
});

test('stub NODE_ENV to test', () => {
  vi.stubEnv('NODE_ENV', 'test');
  expect(isProduction()).toBe(false);
  vi.unstubAllEnvs();
});
```

## Explanation

`Advanced Patterns` Use vi.stubEnv() to set environment variables for tests.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

function getEnvironment() {
  return process.env.NODE_ENV || 'development';
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

test('stub NODE_ENV to production', () => {
  vi.stubEnv('NODE_ENV', 'production');
  // TODO: add assertion using Advanced Patterns: vi.stubEnv
  // TODO: add assertion using Advanced Patterns: vi.stubEnv
  vi.unstubAllEnvs();
});

test('stub NODE_ENV to test', () => {
  vi.stubEnv('NODE_ENV', 'test');
  // TODO: add assertion using Advanced Patterns: vi.stubEnv
  vi.unstubAllEnvs();
});
```
