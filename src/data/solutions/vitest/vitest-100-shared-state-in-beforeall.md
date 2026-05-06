# Shared State in beforeAll

**Level:** 100
**ID:** `vitest-100`
**XP:** 100
**Tags:** `beforeAll`, `shared-state`, `expensive-setup`

## Objective

Use beforeAll to create a shared object used across multiple tests.

## Story

An expensive initialization runs once and its result is shared by all tests.

## Hints
1. connection is set once in beforeAll and available to all tests.
2. All three tests share the same connection object.

## Solution

```javascript
import { test, expect, beforeAll } from 'vitest';
let connection;
beforeAll(async () => {
  connection = await new Promise(r => setTimeout(()=>r({id:'conn-1',status:'open'}),0));
});
test('open', () => { expect(connection.status).toBe('open'); });
test('has id', () => { expect(connection.id).toBe('conn-1'); });
test('reused', () => { expect(connection).not.toBeNull(); expect(connection.status).toBe('open'); });
```

## Explanation

Vitest's `Shared State in beforeAll` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, beforeAll } from 'vitest';

let connection;

beforeAll(async () => {
  // Simulate an expensive connection
  connection = await new Promise(resolve =>
    setTimeout(() => resolve({ id: 'conn-1', status: 'open' }), 0)
  );
});

test('connection is open', () => {
  // TODO: Assert connection.status is 'open'
});

test('connection has id', () => {
  // TODO: Assert connection.id is 'conn-1'
});

test('connection is reused', () => {
  // TODO: Assert connection is not null
  // TODO: Assert connection.status is still 'open'
});
```
