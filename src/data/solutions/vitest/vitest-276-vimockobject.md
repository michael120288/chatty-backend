# vi.mockObject

**Level:** 276
**ID:** `vitest-276`
**XP:** 950
**Tags:** `mocking`, `vi.mockObject`

## Objective

Complete the starter code using vi.mockObject so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.mockObject to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi } from 'vitest'

const userService = {
  name: 'UserService',
  version: '1.0',
  getUser: (id) => ({ id, name: 'Real User' }),
  deleteUser: (id) => ({ deleted: id })
}

test('mock specific methods on object', () => {
  const mock = vi.mockObject(userService)
  mock.getUser.mockReturnValue({ id: 99, name: 'Mock User' })
  expect(mock.getUser(1)).toEqual({ id: 99, name: 'Mock User' })
})

test('non-mocked properties are preserved', () => {
  const mock = vi.mockObject(userService)
  expect(mock.name).toBe('UserService')
  expect(mock.version).toBe('1.0')
})

test('other methods become stubs', () => {
  const mock = vi.mockObject(userService)
  mock.deleteUser.mockReturnValue({ deleted: true })
  expect(mock.deleteUser(5)).toEqual({ deleted: true })
})

test('mock functions are vi.fn()', () => {
  const mock = vi.mockObject(userService)
  mock.getUser(42)
  expect(mock.getUser).toHaveBeenCalledWith(42)
})
```

## Explanation

`vi.mockObject` Use `vi.mockObject(original)` to create a partial mock that preserves the original type and all non-function properties.

## Starter Code

```javascript
import { expect, test, vi } from 'vitest'

// TODO: use vi.mockObject to mock a service object
// Replace specific methods while keeping the rest intact

const userService = {
  name: 'UserService',
  version: '1.0',
  getUser: (id) => ({ id, name: 'Real User' }),
  deleteUser: (id) => ({ deleted: id })
}

test('mock specific methods', () => {
  // create mock and override getUser
})
```
