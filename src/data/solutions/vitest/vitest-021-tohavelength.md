# toHaveLength

**Level:** 21
**ID:** `vitest-021`
**XP:** 100
**Tags:** `toHaveLength`, `arrays`, `strings`

## Objective

Use toHaveLength on arrays and strings.

## Story

Count the members of the guild. Verify the party size.

## Hints
1. expect(array).toHaveLength(3)
2. expect('vitest').toHaveLength(6)

## Solution

```javascript
import { test, expect } from 'vitest';
test('array has correct length', () => {
  expect(['warrior', 'mage', 'rogue']).toHaveLength(3);
});
test('string has correct length', () => {
  expect('vitest').toHaveLength(6);
});
```

## Explanation

Vitest's `toHaveLength` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('array has correct length', () => {
  const party = ['warrior', 'mage', 'rogue'];
  // TODO: Assert party has length 3
});

test('string has correct length', () => {
  // TODO: Assert 'vitest' has length 6
});
```
