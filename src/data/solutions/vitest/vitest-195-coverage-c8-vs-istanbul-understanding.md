# Coverage: c8 vs istanbul understanding

**Level:** 195
**ID:** `vitest-195`
**XP:** 200
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: c8 vs istanbul understanding so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: c8 vs istanbul understanding to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: c8 vs istanbul understanding` in your test assertions.
2. Check the Vitest docs for `Coverage: c8 vs istanbul understanding` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

function processOrder(order) {
  const { items = [], discount = 0, taxRate = 0.1 } = order;

  if (!items.length) return { total: 0, tax: 0, final: 0 };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discounted = subtotal * (1 - discount);
  const tax = discounted * taxRate;

  return {
    total: subtotal,
    discounted,
    tax: parseFloat(tax.toFixed(2)),
    final: parseFloat((discounted + tax).toFixed(2)),
  };
}

test('processOrder: empty order', () => {
  expect(processOrder({ items: [] })).toEqual({ total: 0, tax: 0, final: 0 });
});

test('processOrder: normal order', () => {
  const result = processOrder({
    items: [{ price: 10, qty: 2 }, { price: 5, qty: 4 }],
    discount: 0.1,
    taxRate: 0.08,
  });
  expect(result.total).toBe(40);
  expect(result.final).toBeCloseTo(39.31, 1);
});
```

## Explanation

`Coverage` Understand coverage providers by testing instrumented code.

## Starter Code

```javascript
import { test, expect } from 'vitest';

// This exercises code that both v8 and istanbul would track
function processOrder(order) {
  const { items = [], discount = 0, taxRate = 0.1 } = order;

  if (!items.length) return { total: 0, tax: 0, final: 0 };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discounted = subtotal * (1 - discount);
  const tax = discounted * taxRate;

  return {
    total: subtotal,
    discounted,
    tax: parseFloat(tax.toFixed(2)),
    final: parseFloat((discounted + tax).toFixed(2)),
  };
}

test('processOrder: empty order', () => {
  // TODO: add assertion using Coverage: c8 vs istanbul understanding
});

test('processOrder: normal order', () => {
  const result = processOrder({
    items: [{ price: 10, qty: 2 }, { price: 5, qty: 4 }],
    discount: 0.1,
    taxRate: 0.08,
  });
  // TODO: add assertion using Coverage: c8 vs istanbul understanding
  // TODO: add assertion using Coverage: c8 vs istanbul understanding
});
```
