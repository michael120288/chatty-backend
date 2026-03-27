# Currying Tests

**Level:** 149
**ID:** `jest-149`
**XP:** 120
**Tags:** `currying`, `closure`, `partial application`

## Objective

Test a curried function with partial application.

## Story

The spellcaster partially applies damage. Test a curried function.

## Hints
1. Curried functions return functions when partially applied.
2. double = multiply(2) — a=2 is captured in closure.
3. Call double(5) to get 2 * 5 = 10.

## Solution

```javascript
const multiply=a=>b=>a*b;const double=multiply(2);const triple=multiply(3);
test('double',()=>{expect(double(5)).toBe(10);expect(double(0)).toBe(0);});
test('triple',()=>{expect(triple(4)).toBe(12);});
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
const multiply = a => b => a * b;
const double = multiply(2);
const triple = multiply(3);

test('double', () => {
  // TODO: Assert that double(5 equals 10 using .toBe().
  // TODO: Assert that double(0 equals 0 using .toBe().
});

test('triple', () => {
  // TODO: Assert that triple(4 equals 12 using .toBe().
});
```
