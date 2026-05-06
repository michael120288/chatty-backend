# expect.objectContaining

**Level:** 27
**ID:** `vitest-027`
**XP:** 100
**Tags:** `objectContaining`, `partial-match`, `asymmetric`

## Objective

Use expect.objectContaining as an inline argument inside toEqual.

## Story

A partial object match with the asymmetric helper.

## Hints
1. expect(result).toEqual(expect.objectContaining({ id: 1, name: 'Bob' }))

## Solution

```javascript
import { test, expect } from 'vitest';
test('matches object subset', () => {
  const result = { id: 1, name: 'Bob', timestamp: Date.now() };
  expect(result).toEqual(expect.objectContaining({ id: 1, name: 'Bob' }));
});
```

## Explanation

Vitest's `expect.objectContaining` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('mock was called with matching object', () => {
  const fn = (obj) => obj;
  const result = fn({ id: 1, name: 'Bob', timestamp: Date.now() });
  // TODO: Assert result matches { id: 1, name: 'Bob' } ignoring timestamp
});
```
