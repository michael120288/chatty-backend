# Chained Promises

**Level:** 41
**ID:** `vitest-041`
**XP:** 100
**Tags:** `promises`, `chaining`, `then`

## Objective

Test a chain of .then() transformations.

## Story

Data flows through a chain of transforms.

## Hints
1. const r = await process(5); expect(r).toBe('result: 11');

## Solution

```javascript
import { test, expect } from 'vitest';
function process(n) {
  return Promise.resolve(n).then(x=>x*2).then(x=>x+1).then(x=>`result: ${x}`);
}
test('process(5)', async () => {
  const r = await process(5);
  expect(r).toBe('result: 11');
});
```

## Explanation

Vitest's `Chained Promises` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function process(n) {
  return Promise.resolve(n)
    .then(x => x * 2)
    .then(x => x + 1)
    .then(x => `result: ${x}`);
}

test('process(5) returns correct string', async () => {
  // TODO: await process(5) and assert result
  // 5*2=10, +1=11, 'result: 11'
});
```
