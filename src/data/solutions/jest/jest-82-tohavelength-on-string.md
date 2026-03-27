# toHaveLength on String

**Level:** 82
**ID:** `jest-82`
**XP:** 100
**Tags:** `toHaveLength`, `string`

## Objective

Use toHaveLength() on a string.

## Story

The hero's name must be exactly 5 characters. Check string length.

## Hints
1. toHaveLength(n) works on strings and arrays.
2. It checks .length property.
3. Use not.toHaveLength for inequality.

## Solution

```javascript
const h='Arwen';
test('name length',()=>{expect(h).toHaveLength(5);});
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
const heroName = 'Arwen';

test('name length', () => {
  // TODO: Assert that heroName has length 5.
});
```
