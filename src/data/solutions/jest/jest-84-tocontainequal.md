# toContainEqual

**Level:** 84
**ID:** `jest-84`
**XP:** 110
**Tags:** `toContainEqual`, `array`, `objects`

## Objective

Use toContainEqual() to find an object by value in an array.

## Story

The treasure chest contains an item. But we only know its shape, not its reference.

## Hints
1. toContainEqual uses deep equality (like toEqual).
2. toContain uses reference equality — different for objects.
3. Useful when you recreate the expected object in the test.

## Solution

```javascript
const chest=[{id:1,name:'Gold Coin'},{id:2,name:'Ruby'}];
test('ruby is in chest',()=>{expect(chest).toContainEqual({id:2,name:'Ruby'});});
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
const chest = [
  { id: 1, name: 'Gold Coin' },
  { id: 2, name: 'Ruby' },
];

test('ruby is in chest', () => {
  // TODO: Assert that chest contains an element matching the expected shape.
});
```
