# Error in beforeEach

**Level:** 104
**ID:** `vitest-104`
**XP:** 100
**Tags:** `beforeEach`, `error-handling`, `setup`

## Objective

Demonstrate that an error thrown in beforeEach fails the test.

## Story

If setup fails, the test should be marked as failed, not silently skipped.

## Hints
1. Set resource = { ready: true } in beforeEach.
2. If beforeEach throws, both tests fail.

## Solution

```javascript
import { describe, test, expect, beforeEach } from 'vitest';
describe('healthy', () => {
  let resource;
  beforeEach(() => { resource = { ready: true }; });
  test('ready', () => { expect(resource.ready).toBe(true); });
  test('is object', () => { expect(resource).toBeTypeOf('object'); });
});
```

## Explanation

Vitest's `Error in beforeEach` is a powerful testing utility.

## Starter Code

```javascript
import { describe, test, expect, beforeEach } from 'vitest';

describe('healthy beforeEach', () => {
  let resource;

  beforeEach(() => {
    // TODO: Set resource to { ready: true }
    // (A failing beforeEach would throw here)
  });

  test('resource is ready', () => {
    expect(resource.ready).toBe(true);
  });

  test('resource is an object', () => {
    expect(resource).toBeTypeOf('object');
  });
});
```
