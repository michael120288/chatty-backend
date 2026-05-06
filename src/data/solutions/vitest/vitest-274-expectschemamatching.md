# expect.schemaMatching

**Level:** 274
**ID:** `vitest-274`
**XP:** 900
**Tags:** `assertions`, `schema`

## Objective

Complete the starter code using expect.schemaMatching so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use expect.schemaMatching to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test } from 'vitest'

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    age: { type: 'integer' }
  },
  required: ['id', 'name']
}

test('user object matches schema', () => {
  const user = { id: 1, name: 'Alice', age: 30 }
  expect(user).toEqual(expect.schemaMatching(userSchema))
})

test('minimal user matches schema', () => {
  expect({ id: 2, name: 'Bob' }).toEqual(expect.schemaMatching(userSchema))
})

test('array of users each match schema', () => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]
  for (const u of users) {
    expect(u).toEqual(expect.schemaMatching(userSchema))
  }
})
```

## Explanation

`expect.schemaMatching` Use `expect.schemaMatching(schema)` to validate objects against a JSON Schema inside `toEqual`.

## Starter Code

```javascript
import { expect, test } from 'vitest'

// TODO: use expect.schemaMatching to validate that API response objects
// conform to a given JSON Schema

test('user object matches schema', () => {
  const user = { id: 1, name: 'Alice', age: 30 }
  // validate with schema
})
```
