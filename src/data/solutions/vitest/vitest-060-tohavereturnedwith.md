# toHaveReturnedWith

**Level:** 60
**ID:** `vitest-060`
**XP:** 100
**Tags:** `toHaveReturnedWith`, `toHaveLastReturnedWith`, `vi.fn`

## Objective

Use toHaveReturnedWith and toHaveLastReturnedWith.

## Story

Verify what the mock returned — not just what it was called with.

## Hints
1. expect(greet).toHaveReturnedWith('Hello, Alice!')
2. expect(greet).toHaveLastReturnedWith('Hello, Bob!')

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('return values', () => {
  const greet = vi.fn(name => `Hello, ${name}!`);
  greet('Alice'); greet('Bob');
  expect(greet).toHaveReturnedWith('Hello, Alice!');
  expect(greet).toHaveLastReturnedWith('Hello, Bob!');
});
```

## Explanation

Vitest's `toHaveReturnedWith` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('verifies return values', () => {
  const greet = vi.fn(name => `Hello, ${name}!`);
  greet('Alice');
  greet('Bob');

  // TODO: Assert mock returned 'Hello, Alice!' at some point
  // TODO: Assert last return was 'Hello, Bob!'
});
```
