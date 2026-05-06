# Snapshots: nested object snapshot

**Level:** 144
**ID:** `vitest-144`
**XP:** 160
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: nested object snapshot so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: nested object snapshot to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

function buildConfig(env) {
  return {
    database: { host: env === 'prod' ? 'db.prod.com' : 'localhost', port: 5432 },
    cache: { ttl: env === 'prod' ? 3600 : 60, maxSize: 1000 },
    features: { darkMode: true, analytics: env === 'prod' },
  };
}

test('prod config snapshot', () => {
  expect(buildConfig('prod')).toMatchSnapshot();
});

test('dev config snapshot', () => {
  expect(buildConfig('dev')).toMatchSnapshot();
});
```

## Explanation

`Snapshots` Snapshot a deeply nested object structure.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function buildConfig(env) {
  return {
    database: { host: env === 'prod' ? 'db.prod.com' : 'localhost', port: 5432 },
    cache: { ttl: env === 'prod' ? 3600 : 60, maxSize: 1000 },
    features: { darkMode: true, analytics: env === 'prod' },
  };
}

test('prod config snapshot', () => {
  // TODO: add assertion using Snapshots: nested object snapshot
});

test('dev config snapshot', () => {
  // TODO: add assertion using Snapshots: nested object snapshot
});
```
