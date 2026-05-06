# vi.setConfig / vi.resetConfig

**Level:** 293
**ID:** `vitest-293`
**XP:** 850
**Tags:** `configuration`, `vi.setConfig`

## Objective

Complete the starter code using vi.setConfig / vi.resetConfig so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.setConfig / vi.resetConfig to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi } from 'vitest'

test('setConfig can set testTimeout', () => {
  expect(() => {
    vi.setConfig({ testTimeout: 10000 })
  }).not.toThrow()
  vi.resetConfig()
})

test('resetConfig restores original config', () => {
  vi.setConfig({ testTimeout: 99999 })
  vi.resetConfig()
  // After reset, config is back to defaults — no error thrown
  expect(true).toBe(true)
})

test('setConfig accepts partial config object', () => {
  expect(() => {
    vi.setConfig({ hookTimeout: 5000 })
  }).not.toThrow()
  vi.resetConfig()
})

test('multiple setConfig calls are additive', () => {
  vi.setConfig({ testTimeout: 5000 })
  vi.setConfig({ hookTimeout: 3000 })
  vi.resetConfig()
  expect(true).toBe(true)
})
```

## Explanation

`vi.setConfig / vi.resetConfig` Use `vi.setConfig(config)` to change Vitest configuration at runtime and `vi.resetConfig()` to restore defaults.

## Starter Code

```javascript
import { expect, test, vi } from 'vitest'

// TODO: use vi.setConfig to change a config value during a test
// then restore it with vi.resetConfig()

test('setConfig changes config at runtime', () => {
  // your test here
})
```
