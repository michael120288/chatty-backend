# Async beforeEach

**Level:** 36
**ID:** `vitest-036`
**XP:** 100
**Tags:** `beforeEach`, `async`, `setup`

## Objective

Use async beforeEach to set up shared state for tests.

## Story

Setup requires an async operation — perhaps seeding a database or fetching config.

## Hints
1. beforeEach(async () => { db = await initDb(); })
2. Vitest awaits async hooks automatically.

## Solution

```javascript
import { describe, test, expect, beforeEach } from 'vitest';
async function initDb() { return { users: [{ id: 1, name: 'Alice' }] }; }
describe('user tests', () => {
  let db;
  beforeEach(async () => { db = await initDb(); });
  test('has one user', () => { expect(db.users).toHaveLength(1); });
  test('first user', () => { expect(db.users[0].name).toBe('Alice'); });
});
```

## Explanation

Vitest's `Async beforeEach` is a powerful testing utility.

## Starter Code

```javascript
import { describe, test, expect, beforeEach } from 'vitest';

async function initDb() {
  return { users: [{ id: 1, name: 'Alice' }] };
}

describe('user tests', () => {
  let db;

  beforeEach(async () => {
    // TODO: Set db = await initDb()
  });

  test('db has one user', () => {
    // TODO: Assert db.users has length 1
  });

  test('first user is Alice', () => {
    // TODO: Assert db.users[0].name is 'Alice'
  });
});
```
