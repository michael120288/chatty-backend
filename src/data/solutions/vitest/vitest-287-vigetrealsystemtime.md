# vi.getRealSystemTime

**Level:** 287
**ID:** `vitest-287`
**XP:** 800
**Tags:** `timers`, `system time`

## Objective

Complete the starter code using vi.getRealSystemTime so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.getRealSystemTime to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

test('getRealSystemTime returns a number (ms since epoch)', () => {
  const real = vi.getRealSystemTime()
  expect(typeof real).toBe('number')
  expect(real).toBeGreaterThan(0)
})

test('real time is close to Date.now() before faking', () => {
  vi.useRealTimers()
  const before = Date.now()
  const real = vi.getRealSystemTime()
  const after = Date.now()
  expect(real).toBeGreaterThanOrEqual(before)
  expect(real).toBeLessThanOrEqual(after)
})

test('getRealSystemTime differs from mocked time', () => {
  vi.setSystemTime(new Date('2000-01-01'))
  const mocked = vi.getMockedSystemTime().getTime()
  const real = vi.getRealSystemTime()
  expect(real).not.toBe(mocked)
})
```

## Explanation

`vi.getRealSystemTime` Use `vi.getRealSystemTime()` to get the actual wall-clock time even while fake timers are active.

## Starter Code

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

// TODO: demonstrate that vi.getRealSystemTime() returns real time
// even when fake timers are installed

test('getRealSystemTime differs from mocked time', () => {
  // your test here
})
```
