# Test Context: Boss Level — full application fixture

**Level:** 165
**ID:** `vitest-165`
**XP:** 250
**Tags:** `test`, `context`

## Objective

Complete the starter code using Test Context: Boss Level so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: Boss Level to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect, vi } from 'vitest';

class EventBus {
  constructor() { this.listeners = {}; }
  on(event, fn) { (this.listeners[event] = this.listeners[event] || []).push(fn); }
  emit(event, data) { (this.listeners[event] || []).forEach(fn => fn(data)); }
}

class UserService {
  constructor(db, bus) { this.db = db; this.bus = bus; }
  create(user) {
    this.db.push(user);
    this.bus.emit('user:created', user);
    return user;
  }
}

const test = base.extend({
  db: async ({}, use) => { const d = []; await use(d); },
  bus: async ({}, use) => { await use(new EventBus()); },
  userService: async ({ db, bus }, use) => { await use(new UserService(db, bus)); },
});

test('UserService creates user and emits event', ({ userService, bus, db }) => {
  const listener = vi.fn();
  bus.on('user:created', listener);
  const user = { id: 1, name: 'Alice' };
  userService.create(user);
  expect(db).toContainEqual(user);
  expect(listener).toHaveBeenCalledWith(user);
});
```

## Explanation

`Test Context` Build a full application test fixture with multiple layers.

## Starter Code

```javascript
import { test as base, expect, vi } from 'vitest';

class EventBus {
  constructor() { this.listeners = {}; }
  on(event, fn) { (this.listeners[event] = this.listeners[event] || []).push(fn); }
  emit(event, data) { (this.listeners[event] || []).forEach(fn => fn(data)); }
}

class UserService {
  constructor(db, bus) { this.db = db; this.bus = bus; }
  create(user) {
    this.db.push(user);
    this.bus.emit('user:created', user);
    return user;
  }
}

const test = base.extend({
  db: async ({}, use) => { const d = []; await use(d); },
  bus: async ({}, use) => { await use(new EventBus()); },
  userService: async ({ db, bus }, use) => { await use(new UserService(db, bus)); },
});

test('UserService creates user and emits event', ({ userService, bus, db }) => {
  const listener = vi.fn();
  bus.on('user:created', listener);
  const user = { id: 1, name: 'Alice' };
  userService.create(user);
  // TODO: add assertion using Test Context: Boss Level
  // TODO: add assertion using Test Context: Boss Level
});
```
