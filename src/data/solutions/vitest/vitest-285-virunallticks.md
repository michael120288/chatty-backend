# vi.runAllTicks

**Level:** 285
**ID:** `vitest-285`
**XP:** 850
**Tags:** `timers`, `microtasks`

## Objective

Complete the starter code using vi.runAllTicks so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.runAllTicks to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

test('nextTick callbacks run after runAllTicks', () => {
  let called = false
  process.nextTick(() => { called = true })
  vi.runAllTicks()
  expect(called).toBe(true)
})

test('multiple nextTick callbacks all run', () => {
  const log = []
  process.nextTick(() => log.push('a'))
  process.nextTick(() => log.push('b'))
  process.nextTick(() => log.push('c'))
  vi.runAllTicks()
  expect(log).toEqual(['a', 'b', 'c'])
})

test('nested nextTick callbacks also run', () => {
  const log = []
  process.nextTick(() => {
    log.push('outer')
    process.nextTick(() => log.push('inner'))
  })
  vi.runAllTicks()
  expect(log).toContain('outer')
})
```

## Explanation

`vi.runAllTicks` Use `vi.runAllTicks()` to flush all microtasks queued via `process.nextTick` when using fake timers.

## Starter Code

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

// TODO: use vi.runAllTicks() to flush process.nextTick callbacks
// Verify callbacks run synchronously

test('nextTick callbacks run after runAllTicks', () => {
  // your test here
})
```
