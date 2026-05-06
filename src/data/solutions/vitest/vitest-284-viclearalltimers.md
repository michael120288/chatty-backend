# vi.clearAllTimers

**Level:** 284
**ID:** `vitest-284`
**XP:** 800
**Tags:** `timers`, `cleanup`

## Objective

Complete the starter code using vi.clearAllTimers so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.clearAllTimers to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

test('callbacks do not fire after clearAllTimers', () => {
  let called = false
  setTimeout(() => { called = true }, 100)
  vi.clearAllTimers()
  vi.runAllTimers()
  expect(called).toBe(false)
})

test('clearAllTimers removes all pending timers', () => {
  setTimeout(() => {}, 100)
  setTimeout(() => {}, 200)
  setTimeout(() => {}, 300)
  vi.clearAllTimers()
  expect(vi.getTimerCount()).toBe(0)
})

test('new timers work fine after clearAllTimers', () => {
  setTimeout(() => {}, 100)
  vi.clearAllTimers()
  let fired = false
  setTimeout(() => { fired = true }, 50)
  vi.runAllTimers()
  expect(fired).toBe(true)
})
```

## Explanation

`vi.clearAllTimers` Use `vi.clearAllTimers()` to cancel all pending fake timers without executing them.

## Starter Code

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

// TODO: schedule timers then clear them with vi.clearAllTimers()
// Verify the callbacks never fire

test('callbacks do not fire after clearAllTimers', () => {
  // your test here
})
```
