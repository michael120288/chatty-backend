# Sorting Tests

**Level:** 197
**ID:** `jest-197`
**XP:** 110
**Tags:** `sort`, `array`, `pure`

## Objective

Test a sorting function with toEqual.

## Story

The leaderboard sorts heroes by score descending. Test the sort.

## Hints
1. Spread [...heroes] creates a copy so original is not mutated.
2. b.score - a.score sorts descending.
3. Check first and last elements for sort order.

## Solution

```javascript
const sortByScore=h=>[...h].sort((a,b)=>b.score-a.score);
test('sort descending',()=>{const heroes=[{name:'Bob',score:70},{name:'Alice',score:90},{name:'Carol',score:80}];const s=sortByScore(heroes);expect(s[0].name).toBe('Alice');expect(s[2].name).toBe('Bob');});
test('does not mutate original',()=>{const heroes=[{name:'B',score:1},{name:'A',score:2}];sortByScore(heroes);expect(heroes[0].name).toBe('B');});
```

## Explanation

Testing number formatting and computed values:

```
it('shows correct total XP', async () => {
  const totalXP = JEST_LEVELS.reduce((sum, l) => sum + l.xpReward, 0); // 390
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  expect(screen.getByText(`${totalXP.toLocaleString()} XP`)).toBeInTheDocument();
});
```

## Starter Code

```javascript
const sortByScore = heroes =>
  [...heroes].sort((a, b) => b.score - a.score);

test('sort descending', () => {
  const heroes = [
    { name: 'Bob', score: 70 },
    { name: 'Alice', score: 90 },
    { name: 'Carol', score: 80 },
  ];
  const sorted = sortByScore(heroes);
  // TODO: Assert that sorted[0].name equals 'Alice' using .toBe().
  // TODO: Assert that sorted[2].name equals 'Bob' using .toBe().
});

test('does not mutate original', () => {
  const heroes = [{ name: 'B', score: 1 }, { name: 'A', score: 2 }];
  sortByScore(heroes);
  // TODO: Assert that heroes[0].name equals 'B' using .toBe().
});
```
