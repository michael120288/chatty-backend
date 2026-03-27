# Testing Object Mutations

**Level:** 104
**ID:** `jest-104`
**XP:** 110
**Tags:** `mutation`, `toEqual`, `objects`

## Objective

Test that a function mutates an object and assert with toEqual.

## Story

The potion factory fills bottles in place. Verify the object was mutated correctly.

## Hints
1. toEqual deep-compares object properties.
2. Since fillPotion mutates in place, the original object changes.
3. Test the state of the object after the call.

## Solution

```javascript
function fillPotion(b,l){b.contents=l;b.full=true;return b;}
test('bottle is filled',()=>{const b={contents:null,full:false};fillPotion(b,'mana');expect(b).toEqual({contents:'mana',full:true});});
```

## Explanation

Testing Redux-connected components with `@reduxjs/toolkit`:

```
import { render } from '../../test-utils'; // custom render with store
render(<GameHome />, { preloadedState: { game: { levels: [], loading: false } } });
expect(screen.getByText('Loading levels...')).not.toBeInTheDocument();
```

Wrap renders with a custom `render` that provides a real Redux store — avoids brittle mocking.

## Starter Code

```javascript
function fillPotion(bottle, liquid) {
  bottle.contents = liquid;
  bottle.full = true;
  return bottle;
}

test('bottle is filled', () => {
  const bottle = { contents: null, full: false };
  fillPotion(bottle, 'mana');
  // TODO: Assert that bottle deeply equals the expected value using .toEqual().
});
```
