# Custom Error Classes

**Level:** 81
**ID:** `jest-81`
**XP:** 120
**Tags:** `toThrow`, `custom error`, `class`

## Objective

Throw and test a custom error class with toThrow(ClassName).

## Story

The dungeon uses typed errors — a DungeonError, not a generic Error.

## Hints
1. toThrow(ClassName) checks instanceof.
2. You can combine: toThrow(DungeonError) plus a message check.
3. Custom errors extend Error and set this.name.

## Solution

```javascript
class DungeonError extends Error{constructor(m){super(m);this.name='DungeonError';}}
function enterDungeon(l){if(l<1)throw new DungeonError('Level too low');return'entered';}
test('throws DungeonError',()=>{expect(()=>enterDungeon(0)).toThrow(DungeonError);});
test('throws with message',()=>{expect(()=>enterDungeon(0)).toThrow('Level too low');});
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
class DungeonError extends Error {
  constructor(msg) { super(msg); this.name = 'DungeonError'; }
}

function enterDungeon(level) {
  if (level < 1) throw new DungeonError('Level too low');
  return 'entered';
}

test('throws DungeonError', () => {
  // TODO: Assert that the function throws the expected error using .toThrow().
});

test('throws with message', () => {
  // TODO: Assert that the function throws the expected error using .toThrow().
});
```
