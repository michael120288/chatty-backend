# vi.getTimerCount

**Level:** 283
**ID:** `vitest-283`
**XP:** 800
**Tags:** `timers`, `inspection`

## Objective

Complete the starter code using vi.getTimerCount so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.getTimerCount to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

test('timer count starts at zero', () => {
  expect(vi.getTimerCount()).toBe(0)
})

test('timer count increases with each setTimeout', () => {
  setTimeout(() => {}, 100)
  setTimeout(() => {}, 200)
  expect(vi.getTimerCount()).toBe(2)
})

test('timer count decreases after runAllTimers', () => {
  setTimeout(() => {}, 100)
  setTimeout(() => {}, 200)
  vi.runAllTimers()
  expect(vi.getTimerCount()).toBe(0)
})

test('clearAllTimers resets count to zero', () => {
  setTimeout(() => {}, 500)
  setTimeout(() => {}, 1000)
  vi.clearAllTimers()
  expect(vi.getTimerCount()).toBe(0)
})
```

## Explanation

`vi.getTimerCount` Use `vi.getTimerCount()` to inspect how many pending timers are queued in the fake timer system.

## Starter Code

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

// TODO: use vi.getTimerCount() to check the number of pending timers

test('timer count increases with each setTimeout', () => {
  // your test here
})
```
