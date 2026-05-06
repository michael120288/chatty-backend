# toBeGreaterThan

**Level:** 16
**ID:** `vitest-016`
**XP:** 100
**Tags:** `toBeGreaterThan`, `toBeLessThan`, `numbers`

## Objective

Use toBeGreaterThan, toBeLessThan to validate numeric ranges.

## Story

The hero's power level must exceed the minimum threshold.

## Hints
1. expect(85).toBeGreaterThan(50)
2. expect(0.02).toBeLessThan(0.05)

## Solution

```javascript
import { test, expect } from 'vitest';
test('score is greater than minimum', () => {
  expect(85).toBeGreaterThan(50);
});
test('error rate is less than threshold', () => {
  expect(0.02).toBeLessThan(0.05);
});
```

## Explanation

Vitest's `toBeGreaterThan` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('score is greater than minimum', () => {
  const score = 85;
  // TODO: Assert score > 50
});

test('error rate is less than threshold', () => {
  const errorRate = 0.02;
  // TODO: Assert errorRate < 0.05
});
```
