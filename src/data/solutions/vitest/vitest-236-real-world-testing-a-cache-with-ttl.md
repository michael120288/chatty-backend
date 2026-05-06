# Real-World: testing a cache with TTL

**Level:** 236
**ID:** `vitest-236`
**XP:** 270
**Tags:** `caching`, `patterns`

## Objective

Complete the starter code using Real-World: testing a cache with TTL so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a cache with TTL to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

class TtlCache<K, V> {
  private store = new Map<K, { value: V; expiresAt: number }>();

  constructor(private ttlMs: number) {}

  set(key: K, value: V): void {
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }

  get(key: K): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) { this.store.delete(key); return undefined; }
    return entry.value;
  }

  has(key: K): boolean { return this.get(key) !== undefined; }
  size(): number { return this.store.size; }
}

test('TtlCache stores and retrieves values', () => {
  const cache = new TtlCache<string, number>(5000);
  cache.set('a', 1);
  cache.set('b', 2);
  expect(cache.get('a')).toBe(1);
  expect(cache.has('b')).toBe(true);
  expect(cache.get('x')).toBeUndefined();
});

test('TtlCache expires entries after TTL', () => {
  const cache = new TtlCache<string, string>(1000);
  cache.set('key', 'value');
  expect(cache.get('key')).toBe('value');
  vi.advanceTimersByTime(1001);
  expect(cache.get('key')).toBeUndefined();
  expect(cache.has('key')).toBe(false);
});

vi.useRealTimers();
```

## Explanation

`Real` Test an LRU-like cache with time-to-live.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

class TtlCache<K, V> {
  private store = new Map<K, { value: V; expiresAt: number }>();

  constructor(private ttlMs: number) {}

  set(key: K, value: V): void {
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }

  get(key: K): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) { this.store.delete(key); return undefined; }
    return entry.value;
  }

  has(key: K): boolean { return this.get(key) !== undefined; }
  size(): number { return this.store.size; }
}

test('TtlCache stores and retrieves values', () => {
  const cache = new TtlCache<string, number>(5000);
  cache.set('a', 1);
  cache.set('b', 2);
  // TODO: add assertion using Real-World: testing a cache with TTL
  // TODO: add assertion using Real-World: testing a cache with TTL
  // TODO: add assertion using Real-World: testing a cache with TTL
});

test('TtlCache expires entries after TTL', () => {
  const cache = new TtlCache<string, string>(1000);
  cache.set('key', 'value');
  // TODO: add assertion using Real-World: testing a cache with TTL
  vi.advanceTimersByTime(1001);
  // TODO: add assertion using Real-World: testing a cache with TTL
  // TODO: add assertion using Real-World: testing a cache with TTL
});

vi.useRealTimers();
```
