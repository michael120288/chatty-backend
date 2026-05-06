# Real-World: testing a queue

**Level:** 238
**ID:** `vitest-238`
**XP:** 260
**Tags:** `queues`, `patterns`

## Objective

Complete the starter code using Real-World: testing a queue so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a queue to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

class PriorityQueue<T> {
  private heap: Array<{ value: T; priority: number }> = [];

  enqueue(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.heap.sort((a, b) => b.priority - a.priority);
  }

  dequeue(): T | undefined {
    return this.heap.shift()?.value;
  }

  peek(): T | undefined { return this.heap[0]?.value; }
  size(): number { return this.heap.length; }
  isEmpty(): boolean { return this.heap.length === 0; }
}

test('PriorityQueue dequeues in priority order', () => {
  const pq = new PriorityQueue<string>();
  pq.enqueue('low', 1);
  pq.enqueue('critical', 10);
  pq.enqueue('medium', 5);
  pq.enqueue('high', 8);

  expect(pq.dequeue()).toBe('critical');
  expect(pq.dequeue()).toBe('high');
  expect(pq.dequeue()).toBe('medium');
  expect(pq.dequeue()).toBe('low');
  expect(pq.isEmpty()).toBe(true);
});

test('PriorityQueue peek does not dequeue', () => {
  const pq = new PriorityQueue<number>();
  pq.enqueue(100, 5);
  pq.enqueue(200, 3);
  expect(pq.peek()).toBe(100);
  expect(pq.size()).toBe(2);
});
```

## Explanation

`Real` lets you complete the starter code using Real-World: testing a queue so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class PriorityQueue<T> {
  private heap: Array<{ value: T; priority: number }> = [];

  enqueue(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.heap.sort((a, b) => b.priority - a.priority);
  }

  dequeue(): T | undefined {
    return this.heap.shift()?.value;
  }

  peek(): T | undefined { return this.heap[0]?.value; }
  size(): number { return this.heap.length; }
  isEmpty(): boolean { return this.heap.length === 0; }
}

test('PriorityQueue dequeues in priority order', () => {
  const pq = new PriorityQueue<string>();
  pq.enqueue('low', 1);
  pq.enqueue('critical', 10);
  pq.enqueue('medium', 5);
  pq.enqueue('high', 8);

  // TODO: add assertion using Real-World: testing a queue
  // TODO: add assertion using Real-World: testing a queue
  // TODO: add assertion using Real-World: testing a queue
  // TODO: add assertion using Real-World: testing a queue
  // TODO: add assertion using Real-World: testing a queue
});

test('PriorityQueue peek does not dequeue', () => {
  const pq = new PriorityQueue<number>();
  pq.enqueue(100, 5);
  pq.enqueue(200, 3);
  // TODO: add assertion using Real-World: testing a queue
  // TODO: add assertion using Real-World: testing a queue
});
```
