# expect.any

**Level:** 29
**ID:** `vitest-029`
**XP:** 100
**Tags:** `expect.any`, `asymmetric`, `types`

## Objective

Use expect.any to match values by type in assertions.

## Story

You know the type but not the exact value. expect.any handles this.

## Hints
1. expect.any(Number), expect.any(String), expect.any(Date)
2. Use inside toEqual or toMatchObject.

## Solution

```javascript
import { test, expect } from 'vitest';
function createUser(name) { return { id: Math.random(), name, createdAt: new Date() }; }
test('createUser shape', () => {
  expect(createUser('Alice')).toEqual({
    id: expect.any(Number),
    name: 'Alice',
    createdAt: expect.any(Date)
  });
});
```

## Explanation

Vitest's `expect.any` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function createUser(name) {
  return { id: Math.random(), name, createdAt: new Date() };
}

test('createUser returns correct shape', () => {
  const user = createUser('Alice');
  // TODO: Assert user matches { id: expect.any(Number), name: 'Alice', createdAt: expect.any(Date) }
});
```
