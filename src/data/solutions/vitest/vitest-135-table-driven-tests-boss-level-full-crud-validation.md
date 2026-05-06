# Table-Driven Tests: Boss Level — full CRUD validation

**Level:** 135
**ID:** `vitest-135`
**XP:** 230
**Tags:** `table`, `driven`

## Objective

Complete the starter code using Table-Driven Tests: Boss Level so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: Boss Level to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { describe, test, expect, beforeEach } from 'vitest';

class Store {
  constructor() { this.items = {}; }
  set(key, value) { this.items[key] = value; }
  get(key) { return this.items[key]; }
  delete(key) { delete this.items[key]; }
  has(key) { return key in this.items; }
}

describe.each([
  [{ key: 'a', value: 1 }],
  [{ key: 'b', value: 'hello' }],
  [{ key: 'c', value: { nested: true } }],
])('Store CRUD for key=$0.key', ([{ key, value }]) => {
  let store;
  beforeEach(() => { store = new Store(); });

  test('set and get', () => {
    store.set(key, value);
    expect(store.get(key)).toEqual(value);
  });

  test('has returns true after set', () => {
    store.set(key, value);
    expect(store.has(key)).toBe(true);
  });

  test('has returns false after delete', () => {
    store.set(key, value);
    store.delete(key);
    expect(store.has(key)).toBe(false);
  });
});
```

## Explanation

`Table` Use describe.each and test.each to test all CRUD operations on a store.

## Starter Code

```javascript
import { describe, test, expect, beforeEach } from 'vitest';

class Store {
  constructor() { this.items = {}; }
  set(key, value) { this.items[key] = value; }
  get(key) { return this.items[key]; }
  delete(key) { delete this.items[key]; }
  has(key) { return key in this.items; }
}

describe.each([
  [{ key: 'a', value: 1 }],
  [{ key: 'b', value: 'hello' }],
  [{ key: 'c', value: { nested: true } }],
])('Store CRUD for key=$0.key', ([{ key, value }]) => {
  let store;
  beforeEach(() => { store = new Store(); });

  test('set and get', () => {
    store.set(key, value);
    // TODO: add assertion using Table-Driven Tests: Boss Level
  });

  test('has returns true after set', () => {
    store.set(key, value);
    // TODO: add assertion using Table-Driven Tests: Boss Level
  });

  test('has returns false after delete', () => {
    store.set(key, value);
    store.delete(key);
    // TODO: add assertion using Table-Driven Tests: Boss Level
  });
});
```
