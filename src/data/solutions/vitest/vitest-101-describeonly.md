# describe.only

**Level:** 101
**ID:** `vitest-101`
**XP:** 100
**Tags:** `describe.only`, `focus`, `isolation`

## Objective

Use describe.only to run only one describe block.

## Story

Focus on a specific describe group during development.

## Hints
1. describe.only runs only tests in that describe.
2. Other describes are skipped.

## Solution

```javascript
import { describe, test, expect } from 'vitest';
describe.only('focused', () => {
  test('a', () => { expect(1).toBe(1); });
  test('b', () => { expect(2*3).toBe(6); });
});
describe('skipped', () => {
  test('skipped', () => { expect(false).toBe(true); });
});
```

## Explanation

Vitest's `describe.only` is a powerful testing utility.

## Starter Code

```javascript
import { describe, test, expect } from 'vitest';

describe.only('focused suite', () => {
  test('a passes', () => { expect(1).toBe(1); });
  test('b passes', () => {
    // TODO: Assert 2 * 3 equals 6
  });
});

describe('skipped suite', () => {
  test('this is skipped', () => {
    expect(false).toBe(true); // would fail, but skipped
  });
});
```
