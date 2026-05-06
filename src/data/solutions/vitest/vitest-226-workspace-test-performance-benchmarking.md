# Workspace: test performance benchmarking

**Level:** 226
**ID:** `vitest-226`
**XP:** 200
**Tags:** `benchmarks`, `performance`

## Objective

Complete the starter code using Workspace: test performance benchmarking so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: test performance benchmarking to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { test, expect } from 'vitest';

function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

function binarySearch(sorted: number[], target: number): number {
  let lo = 0, hi = sorted.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

const sorted = Array.from({ length: 10000 }, (_, i) => i * 2);

test('linearSearch finds element', () => {
  expect(linearSearch(sorted, 500)).toBeGreaterThan(-1);
  expect(linearSearch(sorted, 9999)).toBe(-1);
});

test('binarySearch finds element', () => {
  expect(binarySearch(sorted, 500)).toBeGreaterThan(-1);
  expect(binarySearch(sorted, 9999)).toBe(-1);
  expect(binarySearch(sorted, 0)).toBe(0);
  expect(binarySearch(sorted, 19998)).toBe(9999);
});
```

## Explanation

`Workspace` Measure performance-sensitive code in tests.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

function binarySearch(sorted: number[], target: number): number {
  let lo = 0, hi = sorted.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

const sorted = Array.from({ length: 10000 }, (_, i) => i * 2);

test('linearSearch finds element', () => {
  // TODO: add assertion using Workspace: test performance benchmarking
  // TODO: add assertion using Workspace: test performance benchmarking
});

test('binarySearch finds element', () => {
  // TODO: add assertion using Workspace: test performance benchmarking
  // TODO: add assertion using Workspace: test performance benchmarking
  // TODO: add assertion using Workspace: test performance benchmarking
  // TODO: add assertion using Workspace: test performance benchmarking
});
```
