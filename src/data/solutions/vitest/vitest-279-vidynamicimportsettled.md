# vi.dynamicImportSettled

**Level:** 279
**ID:** `vitest-279`
**XP:** 850
**Tags:** `modules`, `dynamic import`

## Objective

Complete the starter code using vi.dynamicImportSettled so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.dynamicImportSettled to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi } from 'vitest'

test('dynamicImportSettled waits for all imports', async () => {
  const promises = [
    import('path'),
    import('os'),
    import('fs')
  ]
  await vi.dynamicImportSettled()
  const [pathMod, osMod, fsMod] = await Promise.all(promises)
  expect(typeof pathMod.join).toBe('function')
  expect(typeof osMod.platform).toBe('function')
  expect(typeof fsMod.readFile).toBe('function')
})

test('returns a promise', () => {
  const p = vi.dynamicImportSettled()
  expect(p).toBeInstanceOf(Promise)
})

test('resolves even when no imports pending', async () => {
  await expect(vi.dynamicImportSettled()).resolves.not.toThrow()
})
```

## Explanation

`vi.dynamicImportSettled` Use `vi.dynamicImportSettled()` to wait until all pending dynamic `import()` calls have resolved.

## Starter Code

```javascript
import { expect, test, vi } from 'vitest'

// TODO: trigger some dynamic imports and then await vi.dynamicImportSettled()
// to ensure all async module loading is complete before asserting

test('all dynamic imports resolved', async () => {
  // kick off imports, then await vi.dynamicImportSettled()
})
```
