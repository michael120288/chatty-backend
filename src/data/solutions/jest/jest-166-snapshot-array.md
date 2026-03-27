# Snapshot Array

**Level:** 166
**ID:** `jest-166`
**XP:** 110
**Tags:** `toMatchSnapshot`, `array`, `snapshot`

## Objective

Use toMatchSnapshot() on an array of objects.

## Story

The dungeon leaderboard must stay stable. Snapshot the array.

## Hints
1. Snapshot arrays the same as objects.
2. Run once to create, then tests detect regressions.
3. Update with --updateSnapshot if the leaderboard changes.

## Solution

```javascript
function getLeaderboard(){return[{rank:1,name:'Alice',score:9000},{rank:2,name:'Bob',score:7500},{rank:3,name:'Carol',score:6000}];}
test('leaderboard snapshot',()=>{expect(getLeaderboard()).toMatchSnapshot();});
```

## Explanation

Testing that filtered data renders correctly:

```
it('only counts jest- IDs toward jest completion', async () => {
  useProgress.mockReturnValue({
    ...defaultProgress,
    completedLevels: ['level-01', 'cy-01', 'jest-01'], // only jest-01 is jest
  });
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  expect(screen.getByText(`1 / ${JEST_LEVELS.length} complete`)).toBeInTheDocument();
});
```

## Starter Code

```javascript
function getLeaderboard() {
  return [
    { rank: 1, name: 'Alice', score: 9000 },
    { rank: 2, name: 'Bob', score: 7500 },
    { rank: 3, name: 'Carol', score: 6000 },
  ];
}

test('leaderboard snapshot', () => {
  // TODO: Assert that getLeaderboard() matches the snapshot.
});
```
