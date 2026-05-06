# expect.addSnapshotSerializer

**Level:** 272
**ID:** `vitest-272`
**XP:** 900
**Tags:** `snapshots`, `serialization`

## Objective

Complete the starter code using expect.addSnapshotSerializer so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use expect.addSnapshotSerializer to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test } from 'vitest'

class Color {
  constructor(r, g, b) { this.r = r; this.g = g; this.b = b }
}

expect.addSnapshotSerializer({
  test: (val) => val instanceof Color,
  print: (val) => `Color(${val.r},${val.g},${val.b})`
})

test('Color serialized in snapshot', () => {
  expect(new Color(255, 0, 128)).toMatchInlineSnapshot(`"Color(255,0,128)"`)
})

test('multiple colors', () => {
  expect(new Color(0, 0, 0)).toMatchInlineSnapshot(`"Color(0,0,0)"`)
})

test('white color', () => {
  expect(new Color(255, 255, 255)).toMatchInlineSnapshot(`"Color(255,255,255)"`)
})
```

## Explanation

`expect.addSnapshotSerializer` Add a custom snapshot serializer so `.toMatchSnapshot()` renders your objects cleanly.

## Starter Code

```javascript
import { expect, test } from 'vitest'

// TODO: add a custom serializer that prints Color objects as "Color(r,g,b)"
// Then verify a Color snapshot matches inline

class Color {
  constructor(r, g, b) { this.r = r; this.g = g; this.b = b }
}

test('Color snapshot', () => {
  // your test here
})
```
