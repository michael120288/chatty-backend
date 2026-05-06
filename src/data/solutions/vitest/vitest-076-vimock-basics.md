# vi.mock() Basics

**Level:** 76
**ID:** `vitest-076`
**XP:** 100
**Tags:** `vi.mock`, `module-mocking`, `factory`

## Objective

Use vi.mock() with a factory to replace a module's exports.

## Story

Mock an entire module — replace all its exports with controlled fakes.

## Hints
1. vi.mock is hoisted — it runs before imports.
2. The factory returns the mock module object.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
import { add } from './math.js';
vi.mock('./math.js', () => ({ add: vi.fn(() => 99) }));
test('mocked add', () => {
  expect(add(1, 2)).toBe(99);
  expect(add).toHaveBeenCalledWith(1, 2);
});
```

## Explanation

Vitest's `vi.mock() Basics` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';
import { add } from './math.js';

vi.mock('./math.js', () => ({
  add: vi.fn(() => 99)
}));

test('mocked add returns 99', () => {
  // TODO: Assert add(1, 2) returns 99
  // TODO: Assert add was called with (1, 2)
});
```
