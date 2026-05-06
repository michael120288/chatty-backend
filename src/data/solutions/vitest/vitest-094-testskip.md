# test.skip

**Level:** 94
**ID:** `vitest-094`
**XP:** 100
**Tags:** `test.skip`, `pending`, `skip`

## Objective

Use test.skip to skip a test and verify the file still passes.

## Story

A test is not ready yet. Skip it without deleting it.

## Hints
1. test.skip marks the test as pending — it doesn't run.
2. Skipped tests show in the output as 'skipped'.

## Solution

```javascript
import { test, expect } from 'vitest';
test('passes', () => { expect(1+1).toBe(2); });
test.skip('skipped', () => { expect(1).toBe(999); });
```

## Explanation

Vitest's `test.skip` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('this test passes', () => {
  expect(1 + 1).toBe(2);
});

// TODO: Skip this test using test.skip
test.skip('this test is skipped', () => {
  // This would fail, but it's skipped
  expect(1).toBe(999);
});
```
