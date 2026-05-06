# vi.waitUntil

**Level:** 292
**ID:** `vitest-292`
**XP:** 900
**Tags:** `async`, `polling`

## Objective

Complete the starter code using vi.waitUntil so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.waitUntil to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi } from 'vitest'

test('waitUntil resolves when condition becomes true', async () => {
  let ready = false
  setTimeout(() => { ready = true }, 50)
  const result = await vi.waitUntil(() => ready, { timeout: 2000, interval: 10 })
  expect(result).toBe(true)
})

test('waitUntil returns the truthy value', async () => {
  let value = null
  setTimeout(() => { value = { id: 42 } }, 30)
  const result = await vi.waitUntil(() => value, { timeout: 2000, interval: 10 })
  expect(result).toEqual({ id: 42 })
})

test('waitUntil rejects on timeout', async () => {
  await expect(
    vi.waitUntil(() => false, { timeout: 100, interval: 10 })
  ).rejects.toThrow()
})
```

## Explanation

`vi.waitUntil` Use `vi.waitUntil(fn, options?)` to poll a condition until it returns truthy, then get the resolved value.

## Starter Code

```javascript
import { expect, test, vi } from 'vitest'

// TODO: use vi.waitUntil to wait for a condition to become true
// Demonstrate with a counter or flag that changes asynchronously

test('waitUntil resolves when condition is met', async () => {
  // your test here
})
```
