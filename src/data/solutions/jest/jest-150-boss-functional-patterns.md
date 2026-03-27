# Boss: Functional Patterns

**Level:** 150
**ID:** `jest-150`
**XP:** 200
**Tags:** `pipe`, `HOF`, `boss`, `jest.fn`

## Objective

Test a pipeline of higher-order functions with mocked logging.

## Story

A hundred and fifty levels. The functional gauntlet — combine closures, HOFs, and mocks.

## Hints
1. pipe applies functions left to right using reduce.
2. (3*2) = 6, 6+10 = 16, 16^2 = 256.
3. The spy in the middle receives 6 (after first addOne).

## Solution

```javascript
function pipe(...fns){return x=>fns.reduce((v,f)=>f(v),x);}
test('pipe functions',()=>{const double=x=>x*2;const addTen=x=>x+10;const square=x=>x*x;const transform=pipe(double,addTen,square);expect(transform(3)).toBe(256);});
test('pipe with spy',()=>{const log=jest.fn(x=>x);const addOne=x=>x+1;const transform=pipe(addOne,log,addOne);const result=transform(5);expect(result).toBe(7);expect(log).toHaveBeenCalledWith(6);});
```

## Explanation

Testing async data fetching patterns:

```
it('displays data after load', async () => {
  gameService.getLevels.mockResolvedValue(ALL_LEVELS);
  render(<GameHome />);
  // First check loading state
  expect(screen.getByText('Loading levels...')).toBeInTheDocument();
  // Then wait for data
  await waitFor(() =>
    expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument()
  );
});
```

## Starter Code

```javascript
function pipe(...fns) {
  return x => fns.reduce((v, f) => f(v), x);
}

test('pipe functions', () => {
  const double = x => x * 2;
  const addTen = x => x + 10;
  const square = x => x * x;

  const transform = pipe(double, addTen, square);
  // TODO: Assert that transform(3 equals 256); // (3*2+10 using .toBe().
});

test('pipe with spy', () => {
  const log = jest.fn(x => x);
  const addOne = x => x + 1;
  const transform = pipe(addOne, log, addOne);
  const result = transform(5);
  // TODO: Assert that result equals 7 using .toBe().
  // TODO: Assert that log was called with the expected arguments.
});
```
