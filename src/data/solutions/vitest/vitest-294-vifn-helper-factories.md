# vi.fn Helper Factories

**Level:** 294
**ID:** `vitest-294`
**XP:** 850
**Tags:** `mocking`, `vi.fn`

## Objective

Complete the starter code using vi.fn Helper Factories so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use vi.fn Helper Factories to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test, vi } from 'vitest'

function createFetchMock(data) {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue(data)
  })
}

test('fetch mock returns expected data', async () => {
  const mockFetch = createFetchMock({ users: ['Alice', 'Bob'] })
  const res = await mockFetch('/api/users')
  const body = await res.json()
  expect(body.users).toContain('Alice')
})

test('fetch mock records call args', async () => {
  const mockFetch = createFetchMock({})
  await mockFetch('/api/profile', { method: 'GET' })
  expect(mockFetch).toHaveBeenCalledWith('/api/profile', { method: 'GET' })
})

test('each test gets independent mock', async () => {
  const mock1 = createFetchMock({ a: 1 })
  const mock2 = createFetchMock({ b: 2 })
  const r1 = await (await mock1()).json()
  const r2 = await (await mock2()).json()
  expect(r1).toEqual({ a: 1 })
  expect(r2).toEqual({ b: 2 })
})

test('mock can be configured per-test', async () => {
  const mockFetch = createFetchMock(null)
  mockFetch.mockResolvedValueOnce({ ok: false, json: vi.fn() })
  const res = await mockFetch('/fail')
  expect(res.ok).toBe(false)
})
```

## Explanation

`vi.fn Helper Factories` Create reusable mock factory helpers using `vi.fn()` with default implementations to DRY up your mocking code.

## Starter Code

```javascript
import { expect, test, vi } from 'vitest'

// TODO: create a helper factory function that returns a configured vi.fn()
// Use it across multiple tests to avoid repetition

function createFetchMock(data) {
  // return a vi.fn() that resolves with { json: () => Promise.resolve(data) }
}

test('fetch mock returns expected data', async () => {
  // use createFetchMock
})
```
