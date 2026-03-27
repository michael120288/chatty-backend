# Testing reduce

**Level:** 121
**ID:** `jest-121`
**XP:** 110
**Tags:** `reduce`, `arrays`, `pure`

## Objective

Test a function that uses .reduce() to sum values.

## Story

The treasurer tallies gold from multiple chests. Test the reduction.

## Hints
1. reduce with initial value 0 handles empty arrays.
2. toEqual for objects, toBe for primitives.
3. Test the empty case to cover the edge.

## Solution

```javascript
const sumGold=c=>c.reduce((t,x)=>t+x.gold,0);
test('sum gold',()=>{expect(sumGold([{gold:10},{gold:20},{gold:30}])).toBe(60);});
test('empty chests',()=>{expect(sumGold([])).toBe(0);});
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
const sumGold = chests => chests.reduce((total, c) => total + c.gold, 0);

test('sum gold', () => {
  // TODO: Assert that sumGold([{ gold: 10 }, { gold: 20 }, { gold: 30 }] equals 60 using .toBe().
});

test('empty chests', () => {
  // TODO: Assert that sumGold([] equals 0 using .toBe().
});
```
