# vi.importMock

**Level:** 278
**ID:** `vitest-278`
**XP:** 900
**Tags:** `mocking`, `vi.importMock`

## Objective

Complete the starter code using vi.importMock so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.importMock to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi } from 'vitest'
import path from 'path'

test('importMock returns auto-mocked module', async () => {
  const mod = await vi.importMock('path')
  // path module functions become mocks
  expect(typeof mod.join).toBe('function')
})

test('auto-mocked functions can be configured', async () => {
  const mod = await vi.importMock('path')
  mod.join.mockReturnValue('/mocked/path')
  expect(mod.join('a', 'b')).toBe('/mocked/path')
})

test('importMock does not call real implementation', async () => {
  const mod = await vi.importMock('path')
  mod.basename.mockReturnValue('mocked.js')
  expect(mod.basename('/real/file.js')).toBe('mocked.js')
  expect(mod.basename).toHaveBeenCalledWith('/real/file.js')
})
```

## Explanation

`vi.importMock` Use `vi.importMock(path)` to import a module with all its exports auto-mocked.

## Starter Code

```javascript
import { expect, test, vi } from 'vitest'

// TODO: use vi.importMock to auto-mock a module
// Check that exported functions become vi.fn() stubs

test('auto-mocked module functions are stubs', async () => {
  // const mod = await vi.importMock('path/to/module')
})
```
