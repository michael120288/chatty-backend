# Test Context: fixture with setup and teardown

**Level:** 152
**ID:** `vitest-152`
**XP:** 180
**Tags:** `test`, `context`

## Objective

Complete the starter code using Test Context: fixture with setup and teardown so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: fixture with setup and teardown to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect } from 'vitest';

class Database {
  constructor() { this.data = []; this.connected = false; }
  connect() { this.connected = true; }
  disconnect() { this.connected = false; }
  insert(record) { this.data.push(record); }
  findAll() { return this.data; }
}

const test = base.extend({
  db: async ({}, use) => {
    const db = new Database();
    db.connect();
    await use(db);
    db.disconnect();
  },
});

test('db fixture connects and provides database', ({ db }) => {
  expect(db.connected).toBe(true);
  db.insert({ id: 1, name: 'Alice' });
  expect(db.findAll()).toHaveLength(1);
});
```

## Explanation

`Test Context` Create a fixture that sets up and tears down resources.

## Starter Code

```javascript
import { test as base, expect } from 'vitest';

class Database {
  constructor() { this.data = []; this.connected = false; }
  connect() { this.connected = true; }
  disconnect() { this.connected = false; }
  insert(record) { this.data.push(record); }
  findAll() { return this.data; }
}

const test = base.extend({
  db: async ({}, use) => {
    const db = new Database();
    db.connect();
    await use(db);
    db.disconnect();
  },
});

test('db fixture connects and provides database', ({ db }) => {
  // TODO: add assertion using Test Context: fixture with setup and teardown
  db.insert({ id: 1, name: 'Alice' });
  // TODO: add assertion using Test Context: fixture with setup and teardown
});
```
