# toMatchObject

**Level:** 25
**ID:** `vitest-025`
**XP:** 100
**Tags:** `toMatchObject`, `partial-matching`, `objects`

## Objective

Use toMatchObject to partially match an object.

## Story

You receive a large response object. You only care about a few fields matching.

## Hints
1. toMatchObject checks that the received object contains all properties of the expected subset.
2. Extra properties in the received object are ignored.

## Solution

```javascript
import { test, expect } from 'vitest';
const response = { status: 200, headers: { 'content-type': 'application/json' }, data: { id: 42, name: 'Alice', createdAt: 'x' } };
test('status and headers', () => {
  expect(response).toMatchObject({ status: 200, headers: { 'content-type': 'application/json' } });
});
test('data subset', () => {
  expect(response.data).toMatchObject({ id: 42, name: 'Alice' });
});
```

## Explanation

Vitest's `toMatchObject` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

const response = {
  status: 200,
  headers: { 'content-type': 'application/json' },
  data: { id: 42, name: 'Alice', createdAt: new Date().toISOString() }
};

test('response has correct status and content-type', () => {
  // TODO: Use toMatchObject to check status and headers only
});

test('data has id and name', () => {
  // TODO: toMatchObject for data with only id and name
});
```
