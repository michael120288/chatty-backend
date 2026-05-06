# TypeScript: class with generics

**Level:** 208
**ID:** `vitest-208`
**XP:** 200
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: class with generics so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: class with generics to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

class Stack<T> {
  private items: T[] = [];
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  get size(): number { return this.items.length; }
  isEmpty(): boolean { return this.items.length === 0; }
}

test('Stack<number>', () => {
  const stack = new Stack<number>();
  expect(stack.isEmpty()).toBe(true);
  stack.push(1); stack.push(2); stack.push(3);
  expect(stack.size).toBe(3);
  expect(stack.peek()).toBe(3);
  expect(stack.pop()).toBe(3);
  expect(stack.size).toBe(2);
});

test('Stack<string>', () => {
  const stack = new Stack<string>();
  stack.push('a'); stack.push('b');
  expect(stack.pop()).toBe('b');
  expect(stack.peek()).toBe('a');
});
```

## Explanation

`TypeScript` lets you complete the starter code using TypeScript: class with generics so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class Stack<T> {
  private items: T[] = [];
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  get size(): number { return this.items.length; }
  isEmpty(): boolean { return this.items.length === 0; }
}

test('Stack<number>', () => {
  const stack = new Stack<number>();
  // TODO: add assertion using TypeScript: class with generics
  stack.push(1); stack.push(2); stack.push(3);
  // TODO: add assertion using TypeScript: class with generics
  // TODO: add assertion using TypeScript: class with generics
  // TODO: add assertion using TypeScript: class with generics
  // TODO: add assertion using TypeScript: class with generics
});

test('Stack<string>', () => {
  const stack = new Stack<string>();
  stack.push('a'); stack.push('b');
  // TODO: add assertion using TypeScript: class with generics
  // TODO: add assertion using TypeScript: class with generics
});
```
