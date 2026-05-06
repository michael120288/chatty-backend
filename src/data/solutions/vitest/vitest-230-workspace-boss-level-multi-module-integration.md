# Workspace: Boss Level — multi-module integration

**Level:** 230
**ID:** `vitest-230`
**XP:** 280
**Tags:** `configuration`, `workspaces`

## Objective

Complete the starter code using Workspace: Boss Level so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: Boss Level to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { describe, test, expect, beforeEach } from 'vitest';

interface Event { type: string; payload: any; timestamp: number; }

class EventStore {
  private events: Event[] = [];
  append(event: Omit<Event, 'timestamp'>) {
    this.events.push({ ...event, timestamp: Date.now() });
  }
  getByType(type: string) { return this.events.filter(e => e.type === type); }
  getAll() { return [...this.events]; }
  clear() { this.events = []; }
}

class UserCommandHandler {
  constructor(private store: EventStore) {}
  createUser(data: { name: string; email: string }) {
    if (!data.email.includes('@')) throw new Error('Invalid email');
    this.store.append({ type: 'USER_CREATED', payload: data });
    return { id: Math.floor(Math.random() * 1000), ...data };
  }
  deleteUser(id: number) {
    this.store.append({ type: 'USER_DELETED', payload: { id } });
  }
}

class UserQueryHandler {
  constructor(private store: EventStore) {}
  getUserCount() { return this.store.getByType('USER_CREATED').length; }
  getDeletedCount() { return this.store.getByType('USER_DELETED').length; }
}

describe('Multi-module event-sourced system', () => {
  let store: EventStore;
  let cmd: UserCommandHandler;
  let query: UserQueryHandler;

  beforeEach(() => {
    store = new EventStore();
    cmd = new UserCommandHandler(store);
    query = new UserQueryHandler(store);
  });

  test('creating users appends events', () => {
    cmd.createUser({ name: 'Alice', email: 'alice@test.com' });
    cmd.createUser({ name: 'Bob', email: 'bob@test.com' });
    expect(query.getUserCount()).toBe(2);
    expect(query.getDeletedCount()).toBe(0);
  });

  test('deleting users appends events', () => {
    const user = cmd.createUser({ name: 'Alice', email: 'alice@test.com' });
    cmd.deleteUser(user.id);
    expect(query.getUserCount()).toBe(1);
    expect(query.getDeletedCount()).toBe(1);
  });

  test('invalid email throws', () => {
    expect(() => cmd.createUser({ name: 'X', email: 'not-an-email' })).toThrow('Invalid email');
    expect(query.getUserCount()).toBe(0);
  });

  test('store is isolated per test', () => {
    expect(store.getAll()).toHaveLength(0);
  });
});
```

## Explanation

`Workspace` Integrate multiple modules together in a comprehensive test suite.

## Starter Code

```javascript
import { describe, test, expect, beforeEach, vi } from 'vitest';

// Multi-module system under test
interface Event { type: string; payload: any; timestamp: number; }

class EventStore {
  private events: Event[] = [];
  append(event: Omit<Event, 'timestamp'>) {
    this.events.push({ ...event, timestamp: Date.now() });
  }
  getByType(type: string) { return this.events.filter(e => e.type === type); }
  getAll() { return [...this.events]; }
  clear() { this.events = []; }
}

class UserCommandHandler {
  constructor(private store: EventStore) {}
  createUser(data: { name: string; email: string }) {
    if (!data.email.includes('@')) throw new Error('Invalid email');
    this.store.append({ type: 'USER_CREATED', payload: data });
    return { id: Math.floor(Math.random() * 1000), ...data };
  }
  deleteUser(id: number) {
    this.store.append({ type: 'USER_DELETED', payload: { id } });
  }
}

class UserQueryHandler {
  constructor(private store: EventStore) {}
  getUserCount() { return this.store.getByType('USER_CREATED').length; }
  getDeletedCount() { return this.store.getByType('USER_DELETED').length; }
}

describe('Multi-module event-sourced system', () => {
  let store: EventStore;
  let cmd: UserCommandHandler;
  let query: UserQueryHandler;

  beforeEach(() => {
    store = new EventStore();
    cmd = new UserCommandHandler(store);
    query = new UserQueryHandler(store);
  });

  test('creating users appends events', () => {
    cmd.createUser({ name: 'Alice', email: 'alice@test.com' });
    cmd.createUser({ name: 'Bob', email: 'bob@test.com' });
    // TODO: add assertion using Workspace: Boss Level
    // TODO: add assertion using Workspace: Boss Level
  });

  test('deleting users appends events', () => {
    const user = cmd.createUser({ name: 'Alice', email: 'alice@test.com' });
    cmd.deleteUser(user.id);
    // TODO: add assertion using Workspace: Boss Level
    // TODO: add assertion using Workspace: Boss Level
  });

  test('invalid email throws', () => {
    // TODO: add assertion using Workspace: Boss Level
    // TODO: add assertion using Workspace: Boss Level
  });

  test('store is isolated per test', () => {
    // TODO: add assertion using Workspace: Boss Level
  });
});
```
