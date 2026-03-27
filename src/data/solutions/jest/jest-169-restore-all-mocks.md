# Restore All Mocks

**Level:** 169
**ID:** `jest-169`
**XP:** 110
**Tags:** `jest.restoreAllMocks`, `spy`, `cleanup`

## Objective

Use jest.restoreAllMocks() to clean up all spies after tests.

## Story

The dungeon cleans all spy wards between battles. Restore all mocks at once.

## Hints
1. jest.restoreAllMocks() restores all spies created with jest.spyOn.
2. Call it in afterEach to guarantee clean state.
3. The second test runs with the real add() function.

## Solution

```javascript
const calculator={add:(a,b)=>a+b};
afterEach(()=>{jest.restoreAllMocks();});
test('spy and override add',()=>{const spy=jest.spyOn(calculator,'add').mockReturnValue(999);expect(calculator.add(1,2)).toBe(999);expect(spy).toHaveBeenCalled();});
test('add restored after mock',()=>{expect(calculator.add(1,2)).toBe(3);});
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
const calculator = {
  add: (a, b) => a + b,
};

afterEach(() => {
  jest.restoreAllMocks();
});

test('spy and override add', () => {
  const spy = jest.spyOn(calculator, 'add').mockReturnValue(999);
  // TODO: Assert that calculator.add(1, 2 equals 999 using .toBe().
  // TODO: Assert that spy was called.
});

test('add restored after mock', () => {
  // TODO: Assert that calculator.add(1, 2 equals 3 using .toBe().
});
```
