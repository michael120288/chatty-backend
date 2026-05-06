# vi.isFakeTimers

**Level:** 291
**ID:** `vitest-291`
**XP:** 750
**Tags:** `timers`, `fake timers`

## Objective

Complete the starter code using vi.isFakeTimers so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.isFakeTimers to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi } from 'vitest'

test('returns false when using real timers', () => {
  vi.useRealTimers()
  expect(vi.isFakeTimers()).toBe(false)
})

test('returns true after useFakeTimers', () => {
  vi.useFakeTimers()
  expect(vi.isFakeTimers()).toBe(true)
  vi.useRealTimers()
})

test('returns false after switching back to real timers', () => {
  vi.useFakeTimers()
  vi.useRealTimers()
  expect(vi.isFakeTimers()).toBe(false)
})

test('can be used inside conditional logic', () => {
  vi.useFakeTimers()
  if (vi.isFakeTimers()) {
    vi.runAllTimers()
  }
  vi.useRealTimers()
  expect(vi.isFakeTimers()).toBe(false)
})
```

## Explanation

`vi.isFakeTimers` Use `vi.isFakeTimers()` to check whether the fake timer system is currently active.

## Starter Code

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

// TODO: use vi.isFakeTimers() before and after useFakeTimers / useRealTimers

test('isFakeTimers reflects timer mode', () => {
  // your test here
})
```
