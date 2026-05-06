# TypeScript: Record and Map types

**Level:** 210
**ID:** `vitest-210`
**XP:** 190
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: Record and Map types so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: Record and Map types to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

type CountMap = Record<string, number>;

function countOccurrences(items: string[]): CountMap {
  return items.reduce<CountMap>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

function mapToRecord<K extends string, V>(m: Map<K, V>): Record<K, V> {
  return Object.fromEntries(m.entries()) as Record<K, V>;
}

test('countOccurrences', () => {
  const result = countOccurrences(['a', 'b', 'a', 'c', 'b', 'a']);
  expect(result).toEqual({ a: 3, b: 2, c: 1 });
  expect(countOccurrences([])).toEqual({});
});

test('mapToRecord', () => {
  const m = new Map<string, number>([['x', 1], ['y', 2]]);
  expect(mapToRecord(m)).toEqual({ x: 1, y: 2 });
});
```

## Explanation

`TypeScript` Test functions using Record and Map generic types.

## Starter Code

```javascript
import { test, expect } from 'vitest';

type CountMap = Record<string, number>;

function countOccurrences(items: string[]): CountMap {
  return items.reduce<CountMap>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

function mapToRecord<K extends string, V>(m: Map<K, V>): Record<K, V> {
  return Object.fromEntries(m.entries()) as Record<K, V>;
}

test('countOccurrences', () => {
  const result = countOccurrences(['a', 'b', 'a', 'c', 'b', 'a']);
  // TODO: add assertion using TypeScript: Record and Map types
  // TODO: add assertion using TypeScript: Record and Map types
});

test('mapToRecord', () => {
  const m = new Map<string, number>([['x', 1], ['y', 2]]);
  // TODO: add assertion using TypeScript: Record and Map types
});
```
