# Mocking a Module with State

**Level:** 80
**ID:** `vitest-080`
**XP:** 100
**Tags:** `module-state`, `beforeEach`, `mock-reset`

## Objective

Create a stateful mock module and reset it between tests.

## Story

A module stores internal state. Reset it between tests via the mock.

## Hints
1. beforeEach clears the store.
2. Each test starts with an empty store.

## Solution

```javascript
import { test, expect, vi, beforeEach } from 'vitest';
const store = {
  _items:[],
  add(item){this._items.push(item);},
  getAll(){return[...this._items];},
  clear(){this._items=[];}
};
beforeEach(()=>{store.clear();});
test('add items',()=>{
  store.add('a');store.add('b');
  expect(store.getAll()).toEqual(['a','b']);
});
test('cleared',()=>{
  expect(store.getAll()).toEqual([]);
  store.add('x');
  expect(store.getAll()).toEqual(['x']);
});
```

## Explanation

Vitest's `Mocking a Module with State` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi, beforeEach } from 'vitest';

// Simulated in-memory store
const store = {
  _items: [],
  add: function(item) { this._items.push(item); },
  getAll: function() { return [...this._items]; },
  clear: function() { this._items = []; }
};

beforeEach(() => {
  store.clear();
});

test('add items to store', () => {
  store.add('a'); store.add('b');
  expect(store.getAll()).toEqual(['a', 'b']);
});

test('store is cleared between tests', () => {
  // TODO: Assert store.getAll() is empty
  store.add('x');
  // TODO: Assert store.getAll() is ['x']
});
```
