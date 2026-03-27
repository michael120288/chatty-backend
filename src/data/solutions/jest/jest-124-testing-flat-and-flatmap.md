# Testing flat and flatMap

**Level:** 124
**ID:** `jest-124`
**XP:** 120
**Tags:** `flat`, `flatMap`, `arrays`

## Objective

Test functions using .flat() and .flatMap().

## Story

Dungeon rooms contain nested loot arrays. Flatten them for the inventory.

## Hints
1. flat() flattens one level deep by default.
2. flatMap() maps then flattens (one level).
3. toEqual for array comparisons.

## Solution

```javascript
const collectLoot=r=>r.flat();const doubleAndFlatten=i=>i.flatMap(x=>[x,x]);
test('flat loot',()=>{expect(collectLoot([['sword'],['shield','potion']])).toEqual(['sword','shield','potion']);});
test('double items',()=>{expect(doubleAndFlatten([1,2])).toEqual([1,1,2,2]);});
```

## Explanation

Testing loading states:

```
it('shows loading spinner while data fetches', () => {
  gameService.getLevels.mockReturnValue(new Promise(() => {})); // never resolves
  render(<GameHome />);
  expect(screen.getByText('Loading levels...')).toBeInTheDocument();
});

it('hides spinner once data loads', async () => {
  render(<GameHome />);
  await waitFor(() =>
    expect(screen.queryByText('Loading levels...')).not.toBeInTheDocument()
  );
});
```

## Starter Code

```javascript
const collectLoot = rooms => rooms.flat();
const doubleAndFlatten = items => items.flatMap(i => [i, i]);

test('flat loot', () => {
  // TODO: Assert that collectLoot([['sword'], ['shield', 'potion']] deeply equals the expected value using .toEqual().
});

test('double items', () => {
  // TODO: Assert that doubleAndFlatten([1, 2] deeply equals the expected value using .toEqual().
});
```
