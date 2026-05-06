# Coverage: covering error paths

**Level:** 187
**ID:** `vitest-187`
**XP:** 180
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: covering error paths so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: covering error paths to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: covering error paths` in your test assertions.
2. Check the Vitest docs for `Coverage: covering error paths` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

function parseConfig(input) {
  if (!input) throw new Error('Config is required');
  if (typeof input === 'string') {
    try {
      return JSON.parse(input);
    } catch {
      throw new Error('Invalid JSON');
    }
  }
  if (typeof input === 'object') return input;
  throw new Error('Unsupported config type');
}

test('parseConfig: all branches', () => {
  expect(() => parseConfig(null)).toThrow('Config is required');
  expect(() => parseConfig('invalid json')).toThrow('Invalid JSON');
  expect(parseConfig('{"key":"val"}')).toEqual({ key: 'val' });
  expect(parseConfig({ key: 'val' })).toEqual({ key: 'val' });
  expect(() => parseConfig(42)).toThrow('Unsupported config type');
});
```

## Explanation

`Coverage` Write tests to cover error-throwing branches.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function parseConfig(input) {
  if (!input) throw new Error('Config is required');
  if (typeof input === 'string') {
    try {
      return JSON.parse(input);
    } catch {
      throw new Error('Invalid JSON');
    }
  }
  if (typeof input === 'object') return input;
  throw new Error('Unsupported config type');
}

test('parseConfig: all branches', () => {
  // TODO: add assertion using Coverage: covering error paths
  // TODO: add assertion using Coverage: covering error paths
  // TODO: add assertion using Coverage: covering error paths
  // TODO: add assertion using Coverage: covering error paths
  // TODO: add assertion using Coverage: covering error paths
});
```
