# mockRestore and vi.restoreAllMocks

**Level:** 63
**ID:** `vitest-063`
**XP:** 100
**Tags:** `mockRestore`, `vi.restoreAllMocks`, `cleanup`

## Objective

Use mockRestore() individually and vi.restoreAllMocks() globally.

## Story

After the test, put everything back as it was.

## Hints
1. vi.restoreAllMocks() restores all spies to their original implementations.
2. The second test runs after afterEach restores.

## Solution

```javascript
import { test, expect, vi, afterEach } from 'vitest';
const math = { square: (n) => n * n };
afterEach(() => { vi.restoreAllMocks(); });
test('spy overrides', () => {
  vi.spyOn(math, 'square').mockReturnValue(999);
  expect(math.square(5)).toBe(999);
});
test('original restored', () => {
  expect(math.square(5)).toBe(25);
});
```

## Explanation

Vitest's `mockRestore and vi.restoreAllMocks` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi, afterEach } from 'vitest';

const math = {
  square: (n) => n * n
};

afterEach(() => {
  vi.restoreAllMocks();
});

test('spy restores original', () => {
  vi.spyOn(math, 'square').mockReturnValue(999);
  expect(math.square(5)).toBe(999);
});

test('original is restored after restoreAllMocks', () => {
  // TODO: Assert math.square(5) now returns 25 (original)
});
```
