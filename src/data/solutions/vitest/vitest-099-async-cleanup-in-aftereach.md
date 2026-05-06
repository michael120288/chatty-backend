# Async Cleanup in afterEach

**Level:** 99
**ID:** `vitest-099`
**XP:** 100
**Tags:** `afterEach`, `async-cleanup`, `resources`

## Objective

Use an async afterEach to perform cleanup.

## Story

A test creates a resource that must be cleaned up asynchronously.

## Hints
1. Use a for loop with await deleteRecord(id) for each id.
2. After cleanup, splice or reassign createdIds.

## Solution

```javascript
import { test, expect, afterEach } from 'vitest';
const createdIds = [];
async function createRecord(name) {
  const id = Math.random().toString(36).slice(2);
  createdIds.push(id); return { id, name };
}
async function deleteRecord(id) {
  const idx=createdIds.indexOf(id);
  if(idx>-1) createdIds.splice(idx,1);
  return true;
}
afterEach(async () => {
  const ids=[...createdIds];
  for(const id of ids) await deleteRecord(id);
});
test('creates', async () => {
  const rec = await createRecord('test');
  expect(rec.name).toBe('test');
  expect(createdIds).toHaveLength(1);
});
test('empty after cleanup', () => { expect(createdIds).toHaveLength(0); });
```

## Explanation

Vitest's `Async Cleanup in afterEach` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, afterEach } from 'vitest';

const createdIds = [];

async function createRecord(name) {
  const id = Math.random().toString(36).slice(2);
  createdIds.push(id);
  return { id, name };
}

async function deleteRecord(id) {
  const idx = createdIds.indexOf(id);
  if (idx > -1) createdIds.splice(idx, 1);
  return true;
}

afterEach(async () => {
  // TODO: Delete all created records (loop createdIds and deleteRecord)
  // Clear createdIds after
});

test('creates a record', async () => {
  const rec = await createRecord('test');
  expect(rec.name).toBe('test');
  expect(createdIds).toHaveLength(1);
});

test('createdIds is empty after cleanup', () => {
  expect(createdIds).toHaveLength(0);
});
```
