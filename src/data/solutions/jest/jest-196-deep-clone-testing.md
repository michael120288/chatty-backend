# Deep Clone Testing

**Level:** 196
**ID:** `jest-196`
**XP:** 120
**Tags:** `deep clone`, `reference`, `toEqual`

## Objective

Test that a deep clone is structurally equal but not the same reference.

## Story

The dungeon deep-copies hero state for undo history. Test deep cloning.

## Hints
1. toEqual checks deep equality.
2. not.toBe checks different object references.
3. JSON clone creates fully new objects at every level.

## Solution

```javascript
function deepClone(o){return JSON.parse(JSON.stringify(o));}
test('deep clone equals original',()=>{const hero={name:'Aria',stats:{hp:100,mp:50}};const clone=deepClone(hero);expect(clone).toEqual(hero);expect(clone).not.toBe(hero);expect(clone.stats).not.toBe(hero.stats);});
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
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

test('deep clone equals original', () => {
  const hero = { name: 'Aria', stats: { hp: 100, mp: 50 } };
  const clone = deepClone(hero);
  // TODO: Assert that clone deeply equals the expected value using .toEqual().
  // TODO: Assert that clone does not equal hero using .not.toBe().
  // TODO: Assert that clone.stats does not equal hero.stats using .not.toBe().
});
```
