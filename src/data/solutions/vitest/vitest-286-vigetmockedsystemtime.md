# vi.getMockedSystemTime

**Level:** 286
**ID:** `vitest-286`
**XP:** 850
**Tags:** `timers`, `system time`

## Objective

Complete the starter code using vi.getMockedSystemTime so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.getMockedSystemTime to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

test('getMockedSystemTime returns set time', () => {
  const fixed = new Date('2030-01-01T00:00:00Z')
  vi.setSystemTime(fixed)
  expect(vi.getMockedSystemTime()).toEqual(fixed)
})

test('getMockedSystemTime advances with timers', () => {
  vi.setSystemTime(new Date('2030-06-01T12:00:00Z'))
  vi.advanceTimersByTime(60_000)
  const mocked = vi.getMockedSystemTime()
  expect(mocked.getTime()).toBe(new Date('2030-06-01T12:01:00Z').getTime())
})

test('returns null when not mocked', () => {
  vi.useRealTimers()
  expect(vi.getMockedSystemTime()).toBeNull()
})
```

## Explanation

`vi.getMockedSystemTime` Use `vi.getMockedSystemTime()` to read the current fake clock value after using `vi.setSystemTime()`.

## Starter Code

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

// TODO: set a fake system time then read it back with vi.getMockedSystemTime()

test('getMockedSystemTime returns set time', () => {
  // your test here
})
```
