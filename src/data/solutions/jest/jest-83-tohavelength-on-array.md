# toHaveLength on Array

**Level:** 83
**ID:** `jest-83`
**XP:** 100
**Tags:** `toHaveLength`, `array`

## Objective

Use toHaveLength() on an array.

## Story

The party must have exactly 3 members. Check the array length.

## Hints
1. toHaveLength(n) reads .length on any value.
2. Works with strings, arrays, objects with .length.
3. Prefer over expect(arr.length).toBe(n).

## Solution

```javascript
const p=['Alice','Bob','Carol'];
test('party size',()=>{expect(p).toHaveLength(3);});
```

## Explanation

`jest.spyOn` with `mockResolvedValue` stubs async API calls in React components:

```
import * as api from '../services/api';

it('displays fetched data', async () => {
  jest.spyOn(api, 'fetchSpells').mockResolvedValue([{ name: 'Fireball' }]);
  render(<SpellList />);
  expect(await screen.findByText('Fireball')).toBeInTheDocument();
});
```

`screen.findBy*` queries return a promise — they wait for the element to appear.

## Starter Code

```javascript
const party = ['Alice', 'Bob', 'Carol'];

test('party size', () => {
  // TODO: Assert that party has length 3.
});
```
