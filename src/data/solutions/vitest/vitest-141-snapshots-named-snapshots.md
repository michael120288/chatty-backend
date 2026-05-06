# Snapshots: named snapshots

**Level:** 141
**ID:** `vitest-141`
**XP:** 160
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: named snapshots so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: named snapshots to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

function summarize(arr) {
  if (arr.length === 0) return { sum: 0, count: 0, avg: NaN };
  return { sum: arr.reduce((a,b) => a+b, 0), count: arr.length, avg: arr.reduce((a,b)=>a+b,0)/arr.length };
}

test('named snapshots', () => {
  expect(summarize([1,2,3])).toMatchSnapshot('small array');
  expect(summarize([10,20,30,40])).toMatchSnapshot('medium array');
  expect(summarize([])).toMatchSnapshot('empty array');
});
```

## Explanation

`Snapshots` Give snapshots names to make them identifiable.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function summarize(arr) {
  return { sum: arr.reduce((a,b) => a+b, 0), count: arr.length, avg: arr.reduce((a,b)=>a+b,0)/arr.length };
}

test('named snapshots', () => {
  // TODO: add assertion using Snapshots: named snapshots
  // TODO: add assertion using Snapshots: named snapshots
  // TODO: add assertion using Snapshots: named snapshots
});
```
