# Async Error Handling

**Level:** 37
**ID:** `vitest-037`
**XP:** 100
**Tags:** `async`, `try-catch`, `errors`

## Objective

Use try/catch in an async test to check error properties.

## Story

An async function throws. Catch it properly in tests.

## Hints
1. try { await riskyOp(-1); } catch (e) { expect(e).toBeInstanceOf(TypeError); ... }

## Solution

```javascript
import { test, expect } from 'vitest';
async function riskyOp(x) {
  if (x < 0) throw new TypeError('Value must be positive');
  return x * 2;
}
test('catches TypeError', async () => {
  expect.assertions(2);
  try {
    await riskyOp(-1);
  } catch (e) {
    expect(e).toBeInstanceOf(TypeError);
    expect(e.message).toContain('positive');
  }
});
```

## Explanation

Vitest's `Async Error Handling` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function riskyOp(x) {
  if (x < 0) throw new TypeError('Value must be positive');
  return x * 2;
}

test('catches TypeError for negative input', async () => {
  expect.assertions(2);
  // TODO: try/catch riskyOp(-1)
  // Assert error is TypeError and message contains 'positive'
});
```
