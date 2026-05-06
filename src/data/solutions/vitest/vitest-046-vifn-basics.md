# vi.fn() Basics

**Level:** 46
**ID:** `vitest-046`
**XP:** 100
**Tags:** `vi.fn`, `mock`, `basics`

## Objective

Create a vi.fn() mock, call it, and verify it was called.

## Story

Create a spy that records every call. Meet vi.fn() — Vitest's mock function.

## Hints
1. expect(mock).toHaveBeenCalled()
2. expect(mock).toHaveBeenCalledWith(42)

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('vi.fn records calls', () => {
  const mock = vi.fn();
  mock(42);
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(42);
});
```

## Explanation

Vitest's `vi.fn() Basics` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('vi.fn records calls', () => {
  const mock = vi.fn();
  // TODO: Call mock with argument 42
  // Assert mock was called
  // Assert mock was called with 42
});
```
