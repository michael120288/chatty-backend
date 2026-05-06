# Workspace: import.meta.env patterns

**Level:** 222
**ID:** `vitest-222`
**XP:** 200
**Tags:** `configuration`, `workspaces`

## Objective

Complete the starter code using Workspace: import.meta.env patterns so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: import.meta.env patterns to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { test, expect, vi } from 'vitest';

function getConfig() {
  const env = {
    MODE: process.env.MODE || 'development',
    BASE_URL: process.env.BASE_URL || '/',
    PROD: process.env.NODE_ENV === 'production',
    DEV: process.env.NODE_ENV !== 'production',
  };
  return env;
}

test('dev environment config', () => {
  vi.stubEnv('NODE_ENV', 'development');
  const config = getConfig();
  expect(config.DEV).toBe(true);
  expect(config.PROD).toBe(false);
  vi.unstubAllEnvs();
});

test('prod environment config', () => {
  vi.stubEnv('NODE_ENV', 'production');
  const config = getConfig();
  expect(config.PROD).toBe(true);
  expect(config.DEV).toBe(false);
  vi.unstubAllEnvs();
});
```

## Explanation

`Workspace` Test code that uses import.meta.env-style environment variables.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

// Simulate import.meta.env pattern without actual Vite
function getConfig() {
  const env = {
    MODE: process.env.MODE || 'development',
    BASE_URL: process.env.BASE_URL || '/',
    PROD: process.env.NODE_ENV === 'production',
    DEV: process.env.NODE_ENV !== 'production',
  };
  return env;
}

test('dev environment config', () => {
  vi.stubEnv('NODE_ENV', 'development');
  const config = getConfig();
  // TODO: add assertion using Workspace: import.meta.env patterns
  // TODO: add assertion using Workspace: import.meta.env patterns
  vi.unstubAllEnvs();
});

test('prod environment config', () => {
  vi.stubEnv('NODE_ENV', 'production');
  const config = getConfig();
  // TODO: add assertion using Workspace: import.meta.env patterns
  // TODO: add assertion using Workspace: import.meta.env patterns
  vi.unstubAllEnvs();
});
```
