# toMatchFileSnapshot

**Level:** 275
**ID:** `vitest-275`
**XP:** 900
**Tags:** `snapshots`, `files`

## Objective

Complete the starter code using toMatchFileSnapshot so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use toMatchFileSnapshot to implement the missing assertions and make everything pass.

## Hints
1. Complete API Coverage

## Solution

```javascript
import { expect, test } from 'vitest'
import path from 'path'
import os from 'os'

function generateCSS(color) {
  return `.btn { background: ${color}; border-radius: 4px; }`
}

test('button CSS snapshot', async () => {
  const css = generateCSS('blue')
  await expect(css).toMatchFileSnapshot(path.join(os.tmpdir(), '__snapshots__/btn-blue.css'))
})

test('red button CSS snapshot', async () => {
  const css = generateCSS('red')
  await expect(css).toMatchFileSnapshot(path.join(os.tmpdir(), '__snapshots__/btn-red.css'))
})

test('snapshot content is deterministic', async () => {
  const css1 = generateCSS('green')
  const css2 = generateCSS('green')
  expect(css1).toBe(css2)
})
```

## Explanation

`toMatchFileSnapshot` Use `.toMatchFileSnapshot(filepath)` to compare output against a file on disk, creating it on first run.

## Starter Code

```javascript
import { expect, test } from 'vitest'

// TODO: use toMatchFileSnapshot to snapshot a CSS string to a file

function generateCSS(color) {
  return `.btn { background: ${color}; border-radius: 4px; }`
}

test('button CSS snapshot', async () => {
  const css = generateCSS('blue')
  // await expect(css).toMatchFileSnapshot(...)
})
```
