# Async with hasAssertions

**Level:** 42
**ID:** `vitest-042`
**XP:** 100
**Tags:** `hasAssertions`, `async`, `filter`

## Objective

Use expect.hasAssertions() in an async test as a safety guard.

## Story

An API call might silently resolve or skip — guard with hasAssertions.

## Hints
1. expect(items).toContain('banana')
2. expect(items).toHaveLength(1)

## Solution

```javascript
import { test, expect } from 'vitest';
async function getItems(f) {
  const all = ['apple','banana','cherry'];
  return f ? all.filter(i=>i.includes(f)) : all;
}
test('filtered items', async () => {
  expect.hasAssertions();
  const items = await getItems('an');
  expect(items).toContain('banana');
  expect(items).toHaveLength(1);
});
```

## Explanation

Vitest's `Async with hasAssertions` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function getItems(filter) {
  const all = ['apple', 'banana', 'cherry'];
  return filter ? all.filter(i => i.includes(filter)) : all;
}

test('filtered items include filter term', async () => {
  expect.hasAssertions();
  const items = await getItems('an');
  // TODO: Assert items contains 'banana'
  // TODO: Assert items length is 1
});
```
