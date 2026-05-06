# Grouping with describe()

**Level:** 4
**ID:** `vitest-004`
**XP:** 100
**Tags:** `describe`, `grouping`, `organisation`

## Objective

Use describe() to group two related tests about an add() function.

## Story

The arena has chambers. Group related tests inside describe() to keep them organised.

## Hints
1. describe('label', () => { test(...); test(...); })
2. Both tests must pass.

## Solution

```javascript
import { describe, test, expect } from 'vitest';
function add(a, b) { return a + b; }
describe('add', () => {
  test('adds positive numbers', () => { expect(add(2, 3)).toBe(5); });
  test('returns 0 for 0 + 0', () => { expect(add(0, 0)).toBe(0); });
});
```

## Explanation

Vitest's `Grouping with describe()` is a powerful testing utility.

## Starter Code

```javascript
import { describe, test, expect } from 'vitest';

function add(a, b) { return a + b; }

// TODO: Create a describe block named 'add' containing:
// - a test: adds positive numbers
// - a test: returns 0 for 0 + 0
```
