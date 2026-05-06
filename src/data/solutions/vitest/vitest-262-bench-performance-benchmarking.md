# bench() — performance benchmarking

**Level:** 262
**ID:** `vitest-262`
**XP:** 200
**Tags:** `benchmarks`, `performance`

## Objective

Complete the starter code using bench so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use bench() to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { bench, describe, expect, test } from 'vitest';

function sumFor(n) {
  let s = 0;
  for (let i = 0; i <= n; i++) s += i;
  return s;
}

function sumFormula(n) {
  return (n * (n + 1)) / 2;
}

describe('sum implementations', () => {
  bench('for loop sum', () => {
    sumFor(1000);
  });

  bench('formula sum', () => {
    sumFormula(1000);
  });
});

test('both implementations give same result', () => {
  expect(sumFor(100)).toBe(sumFormula(100));
  expect(sumFor(1000)).toBe(sumFormula(1000));
});

bench('JSON.stringify small object', () => {
  JSON.stringify({ id: 1, name: 'Alice', active: true });
});

bench('JSON.parse small string', () => {
  JSON.parse('{"id":1,"name":"Alice","active":true}');
});
```

## Explanation

`bench()` Use bench() to measure how fast a function runs. Vitest runs it many times and reports ops/second.

## Starter Code

```javascript
import { bench, describe, expect, test } from 'vitest';

// bench() runs the function many times to measure performance.
// Use describe() to group benchmarks together for comparison.

function sumFor(n) {
  let s = 0;
  for (let i = 0; i <= n; i++) s += i;
  return s;
}

function sumFormula(n) {
  return (n * (n + 1)) / 2;
}

describe('sum implementations', () => {
  bench('for loop sum', () => {
    sumFor(1000);
  });

  bench('formula sum', () => {
    sumFormula(1000);
  });
});

// Normal tests can coexist with bench
test('both implementations give same result', () => {
  // TODO: add assertion using bench
  // TODO: add assertion using bench
});

bench('JSON.stringify small object', () => {
  JSON.stringify({ id: 1, name: 'Alice', active: true });
});

bench('JSON.parse small string', () => {
  JSON.parse('{"id":1,"name":"Alice","active":true}');
});
```
