# Setup & Teardown Boss Level

**Level:** 105
**ID:** `vitest-105`
**XP:** 150
**Tags:** `lifecycle`, `boss`, `beforeAll`, `afterAll`, `beforeEach`, `afterEach`

## Objective

Implement a complete setup/teardown lifecycle for a test suite.

## Story

A full lifecycle: connect before all, seed before each, clean after each, disconnect after all.

## Hints
1. beforeAll → connect; beforeEach → seed; afterEach → clean; afterAll → disconnect.
2. events tracks the sequence.

## Solution

```javascript
import { test, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
const events=[];
let db;
beforeAll(async()=>{ db={connected:true,records:[]}; events.push('connect'); });
afterAll(async()=>{ db.connected=false; events.push('disconnect'); });
beforeEach(()=>{ events.push('seed'); db.records.push({id:Date.now()}); });
afterEach(()=>{ events.push('clean'); db.records=[]; });
test('connected',()=>{ expect(db.connected).toBe(true); });
test('fresh record',()=>{ expect(db.records).toHaveLength(1); });
test('lifecycle order',()=>{
  expect(events[0]).toBe('connect');
  expect(events[1]).toBe('seed');
});
```

## Explanation

Vitest's `Setup & Teardown Boss Level` is a powerful testing utility.

## Starter Code

```javascript
import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';

const events = [];
let db;

beforeAll(async () => {
  // TODO: Set db = { connected: true, records: [] } and push 'connect' to events
});

afterAll(async () => {
  // TODO: Set db.connected = false and push 'disconnect' to events
});

beforeEach(() => {
  // TODO: Push 'seed' to events and add a record { id: Date.now() } to db.records
});

afterEach(() => {
  // TODO: Push 'clean' to events and clear db.records
});

test('db is connected', () => {
  expect(db.connected).toBe(true);
});

test('each test gets a fresh record', () => {
  expect(db.records).toHaveLength(1);
});

test('lifecycle events are in order', () => {
  // After 3 beforeEach calls and 2 afterEach calls so far:
  // ['connect', 'seed', 'clean', 'seed', 'clean', 'seed']
  expect(events[0]).toBe('connect');
  expect(events[1]).toBe('seed');
});
```
