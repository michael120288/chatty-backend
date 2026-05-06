# vi.runOnlyPendingTimersAsync

**Level:** 289
**ID:** `vitest-289`
**XP:** 900
**Tags:** `timers`, `pending`

## Objective

Complete the starter code using vi.runOnlyPendingTimersAsync so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.runOnlyPendingTimersAsync to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

test('only initially pending timers run', async () => {
  const log = []
  setTimeout(() => {
    log.push('first')
    setTimeout(() => log.push('spawned'), 100)
  }, 100)
  await vi.runOnlyPendingTimersAsync()
  expect(log).toEqual(['first'])
  expect(log).not.toContain('spawned')
})

test('multiple pending timers all fire', async () => {
  const log = []
  setTimeout(() => log.push('a'), 10)
  setTimeout(() => log.push('b'), 20)
  await vi.runOnlyPendingTimersAsync()
  expect(log).toEqual(['a', 'b'])
})

test('returns a promise', () => {
  const p = vi.runOnlyPendingTimersAsync()
  expect(p).toBeInstanceOf(Promise)
})
```

## Explanation

`vi.runOnlyPendingTimersAsync` Use `vi.runOnlyPendingTimersAsync()` to fire only currently queued timers without running timers spawned during execution.

## Starter Code

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

// TODO: contrast runOnlyPendingTimersAsync vs runAllTimersAsync
// Show that only the currently queued timers fire, not new ones spawned

test('only pending timers run', async () => {
  // your test here
})
```
