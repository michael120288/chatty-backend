# vi.setTimerTickMode

**Level:** 290
**ID:** `vitest-290`
**XP:** 850
**Tags:** `timers`, `configuration`

## Objective

Complete the starter code using vi.setTimerTickMode so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.setTimerTickMode to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

test('manual mode does not auto-advance', () => {
  vi.setTimerTickMode('manual')
  let called = false
  setTimeout(() => { called = true }, 100)
  // Without advancing, the timer should not fire
  expect(called).toBe(false)
  vi.advanceTimersByTime(100)
  expect(called).toBe(true)
})

test('setTimerTickMode accepts auto mode', () => {
  expect(() => vi.setTimerTickMode('auto')).not.toThrow()
})

test('setTimerTickMode accepts manual mode', () => {
  expect(() => vi.setTimerTickMode('manual')).not.toThrow()
})
```

## Explanation

`vi.setTimerTickMode` Use `vi.setTimerTickMode('auto' | 'manual')` to control whether fake timers advance automatically or only on demand.

## Starter Code

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

// TODO: use vi.setTimerTickMode to switch between auto and manual
// Demonstrate the difference in behavior

test('manual mode requires explicit advance', () => {
  // your test here
})
```
