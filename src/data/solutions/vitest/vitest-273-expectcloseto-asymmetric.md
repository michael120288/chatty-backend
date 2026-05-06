# expect.closeTo (Asymmetric)

**Level:** 273
**ID:** `vitest-273`
**XP:** 800
**Tags:** `assertions`, `floating point`

## Objective

Complete the starter code using expect.closeTo so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use expect.closeTo (Asymmetric) to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test } from 'vitest'

test('float sum in object', () => {
  const result = { total: 0.1 + 0.2 }
  expect(result).toEqual({ total: expect.closeTo(0.3, 5) })
})

test('array of floats', () => {
  const values = [Math.PI, Math.E]
  expect(values).toEqual([
    expect.closeTo(3.14159, 4),
    expect.closeTo(2.71828, 4)
  ])
})

test('default precision 2 decimal places', () => {
  expect({ ratio: 1 / 3 }).toEqual({ ratio: expect.closeTo(0.333) })
})

test('nested close values', () => {
  expect({ a: { b: 0.1 + 0.2 } }).toEqual({ a: { b: expect.closeTo(0.3) } })
})
```

## Explanation

`expect.closeTo ()` Use `expect.closeTo(number, precision?)` as an asymmetric matcher inside `toEqual` for floating-point comparisons.

## Starter Code

```javascript
import { expect, test } from 'vitest'

// TODO: use expect.closeTo inside toEqual to handle floating-point imprecision

test('float sum in object', () => {
  const result = { total: 0.1 + 0.2 }
  // use expect.closeTo here
})
```
