# Hook Scoping in Nested describe

**Level:** 93
**ID:** `vitest-093`
**XP:** 100
**Tags:** `beforeEach`, `scoping`, `nested-describe`

## Objective

Demonstrate how beforeEach scopes to its describe block.

## Story

Inner describe hooks override outer ones — verify the scoping rules.

## Hints
1. Hooks run from outer to inner — outer beforeEach runs first, then inner.
2. Tests outside inner describe only see outer beforeEach.

## Solution

```javascript
import { describe, test, expect, beforeEach } from 'vitest';
let value;
beforeEach(() => { value = 'outer'; });
describe('inner', () => {
  beforeEach(() => { value = 'inner'; });
  test('inner value', () => { expect(value).toBe('inner'); });
});
test('outer value', () => { expect(value).toBe('outer'); });
```

## Explanation

Vitest's `Hook Scoping in Nested describe` is a powerful testing utility.

## Starter Code

```javascript
import { describe, test, expect, beforeEach } from 'vitest';

let value;

beforeEach(() => {
  value = 'outer';
});

describe('inner scope', () => {
  beforeEach(() => {
    value = 'inner';
  });

  test('inner beforeEach runs last', () => {
    // TODO: Assert value is 'inner'
  });
});

test('outer scope has outer value', () => {
  // TODO: Assert value is 'outer'
});
```
