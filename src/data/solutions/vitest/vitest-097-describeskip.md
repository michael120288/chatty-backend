# describe.skip

**Level:** 97
**ID:** `vitest-097`
**XP:** 100
**Tags:** `describe.skip`, `skip`, `WIP`

## Objective

Use describe.skip to skip an entire group of tests.

## Story

An entire section is under construction. Skip the whole describe block.

## Hints
1. describe.skip skips all tests inside that describe block.
2. The file still passes because the failing tests are skipped.

## Solution

```javascript
import { describe, test, expect } from 'vitest';
describe('active', () => { test('works', () => { expect(true).toBe(true); }); });
describe.skip('WIP', () => {
  test('fails 1', () => { expect(false).toBe(true); });
  test('fails 2', () => { expect(0).toBe(1); });
});
```

## Explanation

Vitest's `describe.skip` is a powerful testing utility.

## Starter Code

```javascript
import { describe, test, expect } from 'vitest';

describe('active feature', () => {
  test('works', () => { expect(true).toBe(true); });
});

describe.skip('WIP feature', () => {
  test('not implemented yet', () => {
    // TODO: These won't run — the describe is skipped
    expect(false).toBe(true); // would fail, but skipped
  });
  test('also skipped', () => {
    expect(0).toBe(1); // would fail, but skipped
  });
});
```
