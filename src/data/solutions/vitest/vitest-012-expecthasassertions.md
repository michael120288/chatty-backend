# expect.hasAssertions()

**Level:** 12
**ID:** `vitest-012`
**XP:** 100
**Tags:** `expect.hasAssertions`, `async`, `guard`

## Objective

Use expect.hasAssertions() to verify at least one assertion runs.

## Story

A looser guard: just make sure at least one assertion ran.

## Hints
1. expect.hasAssertions() verifies at least one assertion ran.
2. const status = await getStatus(); expect(status).toBe('ok');

## Solution

```javascript
import { test, expect } from 'vitest';
async function getStatus() { return 'ok'; }
test('status is ok', async () => {
  expect.hasAssertions();
  const status = await getStatus();
  expect(status).toBe('ok');
});
```

## Explanation

Vitest's `expect.hasAssertions()` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function getStatus() {
  return 'ok';
}

test('status is ok', async () => {
  expect.hasAssertions();
  // TODO: await getStatus() and assert it equals 'ok'
});
```
