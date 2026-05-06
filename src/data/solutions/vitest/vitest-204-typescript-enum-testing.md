# TypeScript: enum testing

**Level:** 204
**ID:** `vitest-204`
**XP:** 190
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: enum testing so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: enum testing to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

enum Direction { Up = 'UP', Down = 'DOWN', Left = 'LEFT', Right = 'RIGHT' }

enum Status { Active = 1, Inactive = 0, Pending = 2 }

function getOpposite(dir: Direction): Direction {
  const map: Record<Direction, Direction> = {
    [Direction.Up]: Direction.Down,
    [Direction.Down]: Direction.Up,
    [Direction.Left]: Direction.Right,
    [Direction.Right]: Direction.Left,
  };
  return map[dir];
}

test('Direction enum', () => {
  expect(getOpposite(Direction.Up)).toBe(Direction.Down);
  expect(getOpposite(Direction.Left)).toBe(Direction.Right);
});

test('Status enum values', () => {
  expect(Status.Active).toBe(1);
  expect(Status.Inactive).toBe(0);
  expect(Status.Pending).toBe(2);
});
```

## Explanation

`TypeScript` lets you complete the starter code using TypeScript: enum testing so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect } from 'vitest';

enum Direction { Up = 'UP', Down = 'DOWN', Left = 'LEFT', Right = 'RIGHT' }

enum Status { Active = 1, Inactive = 0, Pending = 2 }

function getOpposite(dir: Direction): Direction {
  const map: Record<Direction, Direction> = {
    [Direction.Up]: Direction.Down,
    [Direction.Down]: Direction.Up,
    [Direction.Left]: Direction.Right,
    [Direction.Right]: Direction.Left,
  };
  return map[dir];
}

test('Direction enum', () => {
  // TODO: add assertion using TypeScript: enum testing
  // TODO: add assertion using TypeScript: enum testing
});

test('Status enum values', () => {
  // TODO: add assertion using TypeScript: enum testing
  // TODO: add assertion using TypeScript: enum testing
  // TODO: add assertion using TypeScript: enum testing
});
```
