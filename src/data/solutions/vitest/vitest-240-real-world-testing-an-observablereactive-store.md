# Real-World: testing an observable/reactive store

**Level:** 240
**ID:** `vitest-240`
**XP:** 270
**Tags:** `integration`, `patterns`

## Objective

Complete the starter code using Real-World: testing an observable/reactive store so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing an observable/reactive store to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

class Store<S extends object> {
  private state: S;
  private subscribers = new Set<(state: S) => void>();

  constructor(initial: S) { this.state = { ...initial }; }

  getState(): Readonly<S> { return this.state; }

  setState(updates: Partial<S>): void {
    this.state = { ...this.state, ...updates };
    this.subscribers.forEach(fn => fn(this.state));
  }

  subscribe(fn: (state: S) => void): () => void {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
}

test('Store initializes with state', () => {
  const store = new Store({ count: 0, name: 'test' });
  expect(store.getState().count).toBe(0);
  expect(store.getState().name).toBe('test');
});

test('Store updates state and notifies subscribers', () => {
  const store = new Store({ count: 0 });
  const listener = vi.fn();
  store.subscribe(listener);
  store.setState({ count: 5 });
  expect(store.getState().count).toBe(5);
  expect(listener).toHaveBeenCalledWith({ count: 5 });
});

test('Store unsubscribe stops notifications', () => {
  const store = new Store({ value: 'a' });
  const listener = vi.fn();
  const unsub = store.subscribe(listener);
  unsub();
  store.setState({ value: 'b' });
  expect(listener).not.toHaveBeenCalled();
});
```

## Explanation

`Real` Test a reactive state store with subscriptions.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

class Store<S extends object> {
  private state: S;
  private subscribers = new Set<(state: S) => void>();

  constructor(initial: S) { this.state = { ...initial }; }

  getState(): Readonly<S> { return this.state; }

  setState(updates: Partial<S>): void {
    this.state = { ...this.state, ...updates };
    this.subscribers.forEach(fn => fn(this.state));
  }

  subscribe(fn: (state: S) => void): () => void {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
}

test('Store initializes with state', () => {
  const store = new Store({ count: 0, name: 'test' });
  // TODO: add assertion using Real-World: testing an observable/reactive store
  // TODO: add assertion using Real-World: testing an observable/reactive store
});

test('Store updates state and notifies subscribers', () => {
  const store = new Store({ count: 0 });
  const listener = vi.fn();
  store.subscribe(listener);
  store.setState({ count: 5 });
  // TODO: add assertion using Real-World: testing an observable/reactive store
  // TODO: add assertion using Real-World: testing an observable/reactive store
});

test('Store unsubscribe stops notifications', () => {
  const store = new Store({ value: 'a' });
  const listener = vi.fn();
  const unsub = store.subscribe(listener);
  unsub();
  store.setState({ value: 'b' });
  // TODO: add assertion using Real-World: testing an observable/reactive store
});
```
