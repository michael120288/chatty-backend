# it() Alias

**Level:** 10
**ID:** `vitest-010`
**XP:** 100
**Tags:** `it`, `test`, `alias`

## Objective

Rewrite two tests using it() instead of test().

## Story

Some testers prefer it(). It is identical to test() — just a matter of style.

## Hints
1. it() is an alias for test(). They are identical.
2. it('description', () => { expect(...).toBe(...); })

## Solution

```javascript
import { describe, it, expect } from 'vitest';
function multiply(a, b) { return a * b; }
describe('multiply', () => {
  it('multiplies two numbers', () => { expect(multiply(3, 4)).toBe(12); });
  it('returns 0 when multiplied by 0', () => { expect(multiply(5, 0)).toBe(0); });
});
```

## Explanation

Vitest's `it() Alias` is a powerful testing utility.

## Starter Code

```javascript
import { describe, it, expect } from 'vitest';

function multiply(a, b) { return a * b; }

describe('multiply', () => {
  // TODO: Use it() for both tests
  // it('multiplies two numbers', ...)
  // it('returns 0 when multiplied by 0', ...)
});
```
