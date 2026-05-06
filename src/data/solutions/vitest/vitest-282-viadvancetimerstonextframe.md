# vi.advanceTimersToNextFrame

**Level:** 282
**ID:** `vitest-282`
**XP:** 900
**Tags:** `timers`, `animation`

## Objective

Complete the starter code using vi.advanceTimersToNextFrame so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.advanceTimersToNextFrame to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

test('rAF callback fires after one frame advance', async () => {
  let called = false
  requestAnimationFrame(() => { called = true })
  await vi.advanceTimersToNextFrame()
  expect(called).toBe(true)
})

test('multiple frames fire sequentially', async () => {
  const log = []
  requestAnimationFrame(() => log.push('frame1'))
  requestAnimationFrame(() => log.push('frame2'))
  await vi.advanceTimersToNextFrame()
  await vi.advanceTimersToNextFrame()
  expect(log).toEqual(['frame1', 'frame2'])
})

test('advanceTimersToNextFrame is async', () => {
  const result = vi.advanceTimersToNextFrame()
  expect(result).toBeInstanceOf(Promise)
})
```

## Explanation

`vi.advanceTimersToNextFrame` Use `vi.advanceTimersToNextFrame()` to advance fake timers by one animation frame (16ms) for testing `requestAnimationFrame`.

## Starter Code

```javascript
import { expect, test, vi, beforeEach, afterEach } from 'vitest'

// TODO: use vi.advanceTimersToNextFrame() to trigger requestAnimationFrame callbacks

test('requestAnimationFrame fires after one frame', async () => {
  // set up fake timers, request a frame, advance, verify callback ran
})
```
