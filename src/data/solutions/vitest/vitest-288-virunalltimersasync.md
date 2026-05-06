# vi.runAllTimersAsync

**Level:** 288
**ID:** `vitest-288`
**XP:** 900
**Tags:** `timers`, `async`

## Objective

Complete the starter code using vi.runAllTimersAsync so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.runAllTimersAsync to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

test('all async timers run with runAllTimersAsync', async () => {
  let count = 0
  setTimeout(() => count++, 100)
  setTimeout(() => count++, 200)
  setTimeout(() => count++, 300)
  await vi.runAllTimersAsync()
  expect(count).toBe(3)
})

test('cascading timers all fire', async () => {
  const log = []
  setTimeout(() => {
    log.push('first')
    setTimeout(() => log.push('second'), 100)
  }, 100)
  await vi.runAllTimersAsync()
  expect(log).toEqual(['first', 'second'])
})

test('returns a promise', () => {
  const p = vi.runAllTimersAsync()
  expect(p).toBeInstanceOf(Promise)
})
```

## Explanation

`vi.runAllTimersAsync` Use `vi.runAllTimersAsync()` to run all pending fake timers, including those that schedule new async timers.

## Starter Code

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

// TODO: schedule cascading timers and use vi.runAllTimersAsync()
// to run them all including any that spawn new timers

test('cascading async timers all run', async () => {
  // your test here
})
```
