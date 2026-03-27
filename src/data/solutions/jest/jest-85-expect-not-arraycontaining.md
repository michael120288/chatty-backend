# expect.not.arrayContaining

**Level:** 85
**ID:** `jest-85`
**XP:** 110
**Tags:** `expect.not.arrayContaining`, `array`

## Objective

Use expect.not.arrayContaining() inside toEqual.

## Story

None of the banned items should be in the approved list.

## Hints
1. expect.not.arrayContaining(arr) — none of arr's items are in the received array.
2. Used as an argument inside another matcher like toEqual.
3. Useful for exclusion assertions.

## Solution

```javascript
const a=['sword','shield','potion'];
test('no banned items',()=>{expect(a).toEqual(expect.not.arrayContaining(['bomb','poison']));});
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
const approved = ['sword', 'shield', 'potion'];

test('no banned items', () => {
  // TODO: Assert that approved does not deeply equal the expected value using .not.toEqual().
});
```
