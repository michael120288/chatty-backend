# Async Mock Factory

**Level:** 84
**ID:** `vitest-084`
**XP:** 100
**Tags:** `async-factory`, `vi.mock`, `partial-mock`

## Objective

Write an async vi.mock factory that spreads real exports.

## Story

The mock factory itself needs to be async — use an async factory with vi.importActual.

## Hints
1. Spread the real module and override specific keys.
2. vi.fn(() => 0) returns 0 for all calls.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const realMath = { add:(a,b)=>a+b, multiply:(a,b)=>a*b };
const mockMath = (async ()=>{ return { ...realMath, multiply: vi.fn(()=>0) }; })();
test('partial mock', async () => {
  const math = await mockMath;
  expect(math.add(2,3)).toBe(5);
  expect(math.multiply(10,10)).toBe(0);
  expect(vi.isMockFunction(math.multiply)).toBe(true);
});
```

## Explanation

Vitest's `Async Mock Factory` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

// Simulate: real math module
const realMath = { add: (a,b) => a+b, multiply: (a,b) => a*b };

// Simulate async factory: spread real, override one
const mockMath = (async () => {
  // TODO: Spread realMath and override multiply with vi.fn(() => 0)
  return { ...realMath, multiply: vi.fn(() => 0) };
})();

test('add is real, multiply is mocked', async () => {
  const math = await mockMath;
  expect(math.add(2, 3)).toBe(5);
  expect(math.multiply(10, 10)).toBe(0);
  expect(vi.isMockFunction(math.multiply)).toBe(true);
});
```
