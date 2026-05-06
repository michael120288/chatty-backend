# Workspace: shared fixture file pattern

**Level:** 219
**ID:** `vitest-219`
**XP:** 220
**Tags:** `configuration`, `workspaces`

## Objective

Complete the starter code using Workspace: shared fixture file pattern so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: shared fixture file pattern to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { test, expect } from 'vitest';

function makeDb() {
  const records: Record<string, any> = {};
  return {
    set(key: string, value: any) { records[key] = value; },
    get(key: string) { return records[key]; },
    delete(key: string) { delete records[key]; },
    clear() { Object.keys(records).forEach(k => delete records[k]); },
    size() { return Object.keys(records).length; },
  };
}

function makeCache(db: ReturnType<typeof makeDb>, ttl = 60) {
  const timestamps: Record<string, number> = {};
  return {
    get(key: string) {
      const ts = timestamps[key];
      if (!ts || Date.now() - ts > ttl * 1000) return undefined;
      return db.get(key);
    },
    set(key: string, value: any) {
      db.set(key, value);
      timestamps[key] = Date.now();
    },
  };
}

test('db fixture', () => {
  const db = makeDb();
  db.set('user:1', { name: 'Alice' });
  expect(db.get('user:1')).toEqual({ name: 'Alice' });
  expect(db.size()).toBe(1);
  db.delete('user:1');
  expect(db.size()).toBe(0);
});

test('cache wraps db', () => {
  const db = makeDb();
  const cache = makeCache(db, 3600);
  cache.set('key', 'value');
  expect(cache.get('key')).toBe('value');
});
```

## Explanation

`Workspace` Implement a reusable fixture module pattern.

## Starter Code

```javascript
import { test, expect } from 'vitest';

// fixtures.ts pattern (inlined here)
function makeDb() {
  const records: Record<string, any> = {};
  return {
    set(key: string, value: any) { records[key] = value; },
    get(key: string) { return records[key]; },
    delete(key: string) { delete records[key]; },
    clear() { Object.keys(records).forEach(k => delete records[k]); },
    size() { return Object.keys(records).length; },
  };
}

function makeCache(db: ReturnType<typeof makeDb>, ttl = 60) {
  const timestamps: Record<string, number> = {};
  return {
    get(key: string) {
      const ts = timestamps[key];
      if (!ts || Date.now() - ts > ttl * 1000) return undefined;
      return db.get(key);
    },
    set(key: string, value: any) {
      db.set(key, value);
      timestamps[key] = Date.now();
    },
  };
}

test('db fixture', () => {
  const db = makeDb();
  db.set('user:1', { name: 'Alice' });
  // TODO: add assertion using Workspace: shared fixture file pattern
  // TODO: add assertion using Workspace: shared fixture file pattern
  db.delete('user:1');
  // TODO: add assertion using Workspace: shared fixture file pattern
});

test('cache wraps db', () => {
  const db = makeDb();
  const cache = makeCache(db, 3600);
  cache.set('key', 'value');
  // TODO: add assertion using Workspace: shared fixture file pattern
});
```
