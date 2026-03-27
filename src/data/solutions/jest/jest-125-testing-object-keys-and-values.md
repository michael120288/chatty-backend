# Testing Object.keys and values

**Level:** 125
**ID:** `jest-125`
**XP:** 110
**Tags:** `Object.keys`, `Object.values`

## Objective

Test functions using Object.keys() and Object.values().

## Story

The wizard inspects the spell registry. Test Object.keys() and Object.values().

## Hints
1. Object.keys returns an array of string keys.
2. Object.values returns an array of values.
3. Spread into Math.max for the maximum value.

## Solution

```javascript
const spells={fire:50,ice:30,thunder:70};
test('spell names',()=>{expect(Object.keys(spells)).toEqual(['fire','ice','thunder']);});
test('spell damages',()=>{expect(Object.values(spells)).toEqual([50,30,70]);});
test('strongest spell',()=>{expect(Math.max(...Object.values(spells))).toBe(70);});
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
const spells = { fire: 50, ice: 30, thunder: 70 };

test('spell names', () => {
  // TODO: Assert that Object.keys(spells deeply equals the expected value using .toEqual().
});

test('spell damages', () => {
  // TODO: Assert that Object.values(spells deeply equals the expected value using .toEqual().
});

test('strongest spell', () => {
  // TODO: Assert that Math.max(...Object.values(spells equals 70 using .toBe().
});
```
