# Hook Execution Order

**Level:** 98
**ID:** `vitest-098`
**XP:** 100
**Tags:** `hook-order`, `lifecycle`, `beforeAll`, `afterAll`

## Objective

Write a test that verifies the execution order of lifecycle hooks.

## Story

Understand when each hook runs relative to tests.

## Hints
1. Order: beforeAll → (beforeEach → test → afterEach) × n → afterAll
2. By test2, the array has 6 entries.

## Solution

```javascript
import { test, expect, beforeAll, beforeEach, afterEach } from 'vitest';
const order = [];
beforeAll(() => { order.push('beforeAll'); });
beforeEach(() => { order.push('beforeEach'); });
afterEach(() => { order.push('afterEach'); });
test('first', () => { order.push('test1'); });
test('order check', () => {
  order.push('test2');
  expect(order).toEqual(['beforeAll','beforeEach','test1','afterEach','beforeEach','test2']);
});
```

## Explanation

Vitest's `Hook Execution Order` is a powerful testing utility.

## Starter Code

```javascript
import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';

const order = [];

beforeAll(() => { order.push('beforeAll'); });
afterAll(() => { /* runs last */ });
beforeEach(() => { order.push('beforeEach'); });
afterEach(() => { order.push('afterEach'); });

test('first test', () => {
  order.push('test1');
  // After this: ['beforeAll', 'beforeEach', 'test1', 'afterEach']
});

test('verify order after both tests', () => {
  order.push('test2');
  // TODO: Assert order equals the expected sequence
  // ['beforeAll', 'beforeEach', 'test1', 'afterEach', 'beforeEach', 'test2']
});
```
