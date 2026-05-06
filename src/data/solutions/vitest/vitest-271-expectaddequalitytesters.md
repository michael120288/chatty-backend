# expect.addEqualityTesters

**Level:** 271
**ID:** `vitest-271`
**XP:** 900
**Tags:** `customization`, `equality`

## Objective

Complete the starter code using expect.addEqualityTesters so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use expect.addEqualityTesters to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test } from 'vitest'

function valueTester(a, b) {
  if (
    typeof a === 'object' && a !== null && 'value' in a &&
    typeof b === 'object' && b !== null && 'value' in b
  ) {
    return a.value === b.value
  }
  return undefined
}
expect.addEqualityTesters([valueTester])

test('custom objects with same value are equal', () => {
  expect({ value: 42 }).toEqual({ value: 42 })
})

test('custom objects with different values are not equal', () => {
  expect({ value: 1 }).not.toEqual({ value: 2 })
})

test('non-value objects still use default equality', () => {
  expect({ name: 'a' }).toEqual({ name: 'a' })
})

test('nested custom objects', () => {
  expect({ inner: { value: 7 } }).toEqual({ inner: { value: 7 } })
})
```

## Explanation

`expect.addEqualityTesters` Register custom equality testers so deepEqual checks understand your domain objects.

## Starter Code

```javascript
import { expect, test } from 'vitest'

// TODO: register a custom tester that treats { value: n } objects as equal
// when their .value properties are equal
// Then write 3 tests using expect(a).toEqual(b) with those objects

test('custom tester registered', () => {
  // your tests here
})
```
