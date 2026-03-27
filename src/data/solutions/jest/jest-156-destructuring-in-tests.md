# Destructuring in Tests

**Level:** 156
**ID:** `jest-156`
**XP:** 110
**Tags:** `destructuring`, `objects`

## Objective

Destructure return values in tests and assert parts.

## Story

The warrior report is destructured for quick access. Test both the full object and parts.

## Hints
1. Destructure the return value for clean assertions.
2. Access nested props: stats.str.
3. Equivalent to getWarrior().name but more readable.

## Solution

```javascript
function getWarrior(){return{name:'Thor',weapon:'Mjolnir',stats:{str:90,def:75}};}
test('warrior report',()=>{const{name,weapon,stats}=getWarrior();expect(name).toBe('Thor');expect(weapon).toBe('Mjolnir');expect(stats.str).toBe(90);});
```

## Explanation

Testing progress bar styles/calculations:

```
it('progress bar reflects partial completion', async () => {
  useProgress.mockReturnValue({ ...defaultProgress, completedLevels: ['jest-01'] });
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  const jestCard = screen.getByText('Jest Unit Testing').closest('a');
  const fill = jestCard.querySelector('.tc-progress-fill');
  const expected = `${(1 / JEST_LEVELS.length) * 100}%`;
  expect(fill).toHaveStyle({ width: expected });
});
```

## Starter Code

```javascript
function getWarrior() {
  return { name: 'Thor', weapon: 'Mjolnir', stats: { str: 90, def: 75 } };
}

test('warrior report', () => {
  const { name, weapon, stats } = getWarrior();
  // TODO: Assert that name equals 'Thor' using .toBe().
  // TODO: Assert that weapon equals 'Mjolnir' using .toBe().
  // TODO: Assert that stats.str equals 90 using .toBe().
});
```
