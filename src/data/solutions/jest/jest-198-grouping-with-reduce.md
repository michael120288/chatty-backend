# Grouping with reduce

**Level:** 198
**ID:** `jest-198`
**XP:** 120
**Tags:** `groupBy`, `reduce`, `object`

## Objective

Test a groupBy function that uses reduce.

## Story

The dungeon categorises heroes by role. Test the groupBy utility.

## Hints
1. reduce accumulates into a groups object.
2. Each group is an array.
3. toHaveLength checks the group size.

## Solution

```javascript
function groupBy(a,k){return a.reduce((g,i)=>{const grp=i[k];g[grp]=g[grp]||[];g[grp].push(i);return g;},{});}
test('group by role',()=>{const heroes=[{name:'Alice',role:'warrior'},{name:'Bob',role:'mage'},{name:'Carol',role:'warrior'}];const g=groupBy(heroes,'role');expect(g.warrior).toHaveLength(2);expect(g.mage).toHaveLength(1);expect(g.warrior[0].name).toBe('Alice');});
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
function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
}

test('group by role', () => {
  const heroes = [
    { name: 'Alice', role: 'warrior' },
    { name: 'Bob', role: 'mage' },
    { name: 'Carol', role: 'warrior' },
  ];
  const groups = groupBy(heroes, 'role');
  // TODO: Assert that groups.warrior has length 2.
  // TODO: Assert that groups.mage has length 1.
  // TODO: Assert that groups.warrior[0].name equals 'Alice' using .toBe().
});
```
