# vi.hoisted

**Level:** 280
**ID:** `vitest-280`
**XP:** 850
**Tags:** `hoisting`, `vi.hoisted`

## Objective

Complete the starter code using vi.hoisted so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.hoisted to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi } from 'vitest'

const { mockData, mockId } = vi.hoisted(() => {
  return {
    mockData: { name: 'Test User', role: 'admin' },
    mockId: 'abc-123'
  }
})

test('hoisted values are available at module level', () => {
  expect(mockData.name).toBe('Test User')
  expect(mockData.role).toBe('admin')
})

test('hoisted id is a string', () => {
  expect(typeof mockId).toBe('string')
  expect(mockId).toBe('abc-123')
})

test('hoisted values can be used inside tests normally', () => {
  const user = { ...mockData, id: mockId }
  expect(user).toEqual({ name: 'Test User', role: 'admin', id: 'abc-123' })
})
```

## Explanation

`vi.hoisted` Use `vi.hoisted(() => ...)` to run code before module-level imports, enabling you to set up mocks before a module loads.

## Starter Code

```javascript
import { expect, test, vi } from 'vitest'

// vi.hoisted runs its callback before any imports execute
// This is used at the TOP of a file to set up mock values
// before vi.mock() factories run

// TODO: demonstrate vi.hoisted by extracting a shared mock value

const { mockValue } = vi.hoisted(() => {
  return { mockValue: 'hoisted!' }
})

test('hoisted value is available before imports', () => {
  expect(mockValue).toBe('hoisted!')
})
```
