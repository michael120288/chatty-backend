# Snapshots: multiple snapshots in one test

**Level:** 140
**ID:** `vitest-140`
**XP:** 150
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: multiple snapshots in one test so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: multiple snapshots in one test to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

function transform(data) {
  return {
    upper: data.toUpperCase(),
    lower: data.toLowerCase(),
    length: data.length,
  };
}

test('multiple snapshot calls', () => {
  expect(transform('Hello')).toMatchSnapshot();
  expect(transform('World')).toMatchSnapshot();
  expect(transform('')).toMatchSnapshot();
});
```

## Explanation

`Snapshots` Call toMatchSnapshot multiple times in a single test.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function transform(data) {
  return {
    upper: data.toUpperCase(),
    lower: data.toLowerCase(),
    length: data.length,
  };
}

test('multiple snapshot calls', () => {
  // TODO: add assertion using Snapshots: multiple snapshots in one test
  // TODO: add assertion using Snapshots: multiple snapshots in one test
  // TODO: add assertion using Snapshots: multiple snapshots in one test
});
```
