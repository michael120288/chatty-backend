# Spread and Rest Tests

**Level:** 157
**ID:** `jest-157`
**XP:** 110
**Tags:** `spread`, `rest`, `Object.assign`

## Objective

Test functions that use spread/rest operators.

## Story

The guild merges hero stats. Test spread and rest operators.

## Hints
1. Object.assign merges left to right — later properties win.
2. Rest ...overrides collects extra arguments.
3. toEqual for deep object comparison.

## Solution

```javascript
const merge=(base,...overrides)=>Object.assign({},$base,...overrides);
// fix:
const mergeFixed=(base,...overrides)=>Object.assign({},base,...overrides);
test('merge no overrides',()=>{expect(mergeFixed({hp:100})).toEqual({hp:100});});
test('merge with override',()=>{expect(mergeFixed({hp:100,mp:50},{mp:80})).toEqual({hp:100,mp:80});});
test('merge multiple',()=>{expect(mergeFixed({a:1},{b:2},{c:3})).toEqual({a:1,b:2,c:3});});
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
const merge = (base, ...overrides) => Object.assign({}, base, ...overrides);

test('merge no overrides', () => {
  // TODO: Assert that merge({ hp: 100 } deeply equals the expected value using .toEqual().
});

test('merge with override', () => {
  // TODO: Assert that merge({ hp: 100, mp: 50 }, { mp: 80 } deeply equals the expected value using .toEqual().
});

test('merge multiple', () => {
  // TODO: Assert that merge({ a: 1 }, { b: 2 }, { c: 3 } deeply equals the expected value using .toEqual().
});
```
