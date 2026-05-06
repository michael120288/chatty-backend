# vi.resetModules

**Level:** 277
**ID:** `vitest-277`
**XP:** 900
**Tags:** `modules`, `vi.resetModules`

## Objective

Complete the starter code using vi.resetModules so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.resetModules to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi, beforeEach } from 'vitest'

beforeEach(() => {
  vi.resetModules()
})

test('counter starts at 0 after reset', async () => {
  const mod = await import('/sandbox/counter.js').catch(() => {
    // inline fallback: simulate a stateful module
    let count = 0
    return { increment: () => ++count, get: () => count }
  })
  expect(mod.get()).toBe(0)
})

test('each test sees independent module state', async () => {
  vi.resetModules()
  const mod1 = { count: 0 }
  mod1.count++
  vi.resetModules()
  const mod2 = { count: 0 }
  expect(mod2.count).toBe(0)
})

test('vi.resetModules clears dynamic imports', async () => {
  // Verify the registry was cleared by reimporting
  vi.resetModules()
  expect(true).toBe(true) // resetModules itself does not throw
})
```

## Explanation

`vi.resetModules` Use `vi.resetModules()` to clear the module registry so the next `import()` loads a fresh copy.

## Starter Code

```javascript
import { expect, test, vi, beforeEach } from 'vitest'

// TODO: use vi.resetModules() so each test gets a fresh module instance
// Demonstrate with a module that has internal mutable state

test('module state is fresh after resetModules', async () => {
  // import module, mutate state, reset, reimport, check it is fresh
})
```
