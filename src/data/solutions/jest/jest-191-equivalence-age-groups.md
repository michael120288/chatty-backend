# Equivalence: Age Groups

**Level:** 191
**ID:** `jest-191`
**XP:** 120
**Tags:** `equivalence`, `test.each`, `partitioning`

## Objective

Use equivalence partitioning to test distinct input classes.

## Story

Heroes are sorted into age groups. Test one from each partition.

## Hints
1. Equivalence partitioning: one test per class is sufficient.
2. Each class covers a range where behaviour is identical.
3. Combine with boundary values for full coverage.

## Solution

```javascript
function ageGroup(a){if(a<13)return'child';if(a<18)return'teen';if(a<65)return'adult';return'senior';}
test.each([[5,'child'],[15,'teen'],[30,'adult'],[70,'senior']])('age %i → %s',(a,g)=>{expect(ageGroup(a)).toBe(g);});
```

## Explanation

Testing hook state with `mockReturnValue` for different scenarios:

```
it('shows 100% progress when all completed', async () => {
  useProgress.mockReturnValue({
    ...defaultProgress,
    completedLevels: JEST_LEVELS.map(l => l.id),
  });
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  const fill = screen.getByText('Jest Unit Testing').closest('a').querySelector('.fill');
  expect(fill).toHaveStyle({ width: '100%' });
});
```

## Starter Code

```javascript
function ageGroup(age) {
  if (age < 13) return 'child';
  if (age < 18) return 'teen';
  if (age < 65) return 'adult';
  return 'senior';
}

test.each([
  [5, 'child'],
  [15, 'teen'],
  [30, 'adult'],
  [70, 'senior'],
])('age %i → %s', (age, group) => {
  // TODO: Assert that ageGroup(age equals group using .toBe().
});
```
