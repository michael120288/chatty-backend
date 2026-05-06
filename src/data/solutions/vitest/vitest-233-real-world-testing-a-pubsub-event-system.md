# Real-World: testing a pub/sub event system

**Level:** 233
**ID:** `vitest-233`
**XP:** 260
**Tags:** `events`, `pub/sub`

## Objective

Complete the starter code using Real-World: testing a pub/sub event system so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a pub/sub event system to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

class EventBus {
  private subs = new Map<string, Set<Function>>();

  on(event: string, handler: Function) {
    if (!this.subs.has(event)) this.subs.set(event, new Set());
    this.subs.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  off(event: string, handler: Function) {
    this.subs.get(event)?.delete(handler);
  }

  emit(event: string, ...args: any[]) {
    this.subs.get(event)?.forEach(h => h(...args));
  }

  once(event: string, handler: Function) {
    const wrapper = (...args: any[]) => { handler(...args); this.off(event, wrapper); };
    this.on(event, wrapper);
  }
}

test('EventBus on/emit', () => {
  const bus = new EventBus();
  const handler = vi.fn();
  bus.on('test', handler);
  bus.emit('test', 'hello', 42);
  expect(handler).toHaveBeenCalledWith('hello', 42);
});

test('EventBus off stops handler', () => {
  const bus = new EventBus();
  const handler = vi.fn();
  const unsub = bus.on('test', handler);
  unsub();
  bus.emit('test', 'data');
  expect(handler).not.toHaveBeenCalled();
});

test('EventBus once fires exactly once', () => {
  const bus = new EventBus();
  const handler = vi.fn();
  bus.once('test', handler);
  bus.emit('test', 1);
  bus.emit('test', 2);
  expect(handler).toHaveBeenCalledTimes(1);
  expect(handler).toHaveBeenCalledWith(1);
});
```

## Explanation

`Real` Test a publish/subscribe event bus implementation.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

class EventBus {
  private subs = new Map<string, Set<Function>>();

  on(event: string, handler: Function) {
    if (!this.subs.has(event)) this.subs.set(event, new Set());
    this.subs.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  off(event: string, handler: Function) {
    this.subs.get(event)?.delete(handler);
  }

  emit(event: string, ...args: any[]) {
    this.subs.get(event)?.forEach(h => h(...args));
  }

  once(event: string, handler: Function) {
    const wrapper = (...args: any[]) => { handler(...args); this.off(event, wrapper); };
    this.on(event, wrapper);
  }
}

test('EventBus on/emit', () => {
  const bus = new EventBus();
  const handler = vi.fn();
  bus.on('test', handler);
  bus.emit('test', 'hello', 42);
  // TODO: add assertion using Real-World: testing a pub/sub event system
});

test('EventBus off stops handler', () => {
  const bus = new EventBus();
  const handler = vi.fn();
  const unsub = bus.on('test', handler);
  unsub();
  bus.emit('test', 'data');
  // TODO: add assertion using Real-World: testing a pub/sub event system
});

test('EventBus once fires exactly once', () => {
  const bus = new EventBus();
  const handler = vi.fn();
  bus.once('test', handler);
  bus.emit('test', 1);
  bus.emit('test', 2);
  // TODO: add assertion using Real-World: testing a pub/sub event system
  // TODO: add assertion using Real-World: testing a pub/sub event system
});
```
