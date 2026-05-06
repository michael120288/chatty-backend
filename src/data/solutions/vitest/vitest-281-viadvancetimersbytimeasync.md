# vi.advanceTimersByTimeAsync

**Level:** 281
**ID:** `vitest-281`
**XP:** 950
**Tags:** `timers`, `async`

## Objective

Complete the starter code using vi.advanceTimersByTimeAsync so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.advanceTimersByTimeAsync to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

test('async callback fires after advanceTimersByTimeAsync', async () => {
  let resolved = false
  const p = new Promise(resolve => {
    setTimeout(() => { resolved = true; resolve() }, 500)
  })
  await vi.advanceTimersByTimeAsync(500)
  expect(resolved).toBe(true)
})

test('partial advance does not trigger late timer', async () => {
  let resolved = false
  setTimeout(() => { resolved = true }, 1000)
  await vi.advanceTimersByTimeAsync(500)
  expect(resolved).toBe(false)
  await vi.advanceTimersByTimeAsync(500)
  expect(resolved).toBe(true)
})

test('multiple timers all fire', async () => {
  const results = []
  setTimeout(() => results.push(1), 100)
  setTimeout(() => results.push(2), 200)
  setTimeout(() => results.push(3), 300)
  await vi.advanceTimersByTimeAsync(300)
  expect(results).toEqual([1, 2, 3])
})
```

## Explanation

`vi.advanceTimersByTimeAsync` Use `vi.advanceTimersByTimeAsync(ms)` to advance fake timers while also flushing any async callbacks scheduled during that time.

## Starter Code

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

// TODO: use fake timers and vi.advanceTimersByTimeAsync to
// advance time and flush async callbacks

test('async timer callbacks fire after advance', async () => {
  // set up fake timers, create a promise-based timer,
  // advance time, verify it resolved
})
```
