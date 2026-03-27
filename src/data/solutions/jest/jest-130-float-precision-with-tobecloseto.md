# Float Precision with toBeCloseTo

**Level:** 130
**ID:** `jest-130`
**XP:** 110
**Tags:** `toBeCloseTo`, `float`, `precision`

## Objective

Use toBeCloseTo() with a custom number of decimal places.

## Story

The alchemy formula requires precise measurements. Floating point needs toBeCloseTo.

## Hints
1. toBeCloseTo(value, decimals) — default 2 decimal places.
2. 0.1 + 0.2 = 0.30000000000000004 in JS.
3. Higher decimal argument = stricter precision.

## Solution

```javascript
function mix(a,b){return a+b;}
test('0.1 + 0.2',()=>{expect(mix(0.1,0.2)).toBeCloseTo(0.3,5);});
test('1.005 rounding',()=>{expect(1.005).toBeCloseTo(1.0,1);});
```

## Explanation

Testing user events with `@testing-library/user-event` (more realistic than `fireEvent`):

```
import userEvent from '@testing-library/user-event';

it('calls resetProgress when confirmed', async () => {
  window.confirm = jest.fn().mockReturnValue(true);
  render(<GameHome />);
  await userEvent.click(screen.getByRole('button', { name: /Reset Progress/i }));
  expect(mockResetProgress).toHaveBeenCalledTimes(1);
});
```

## Starter Code

```javascript
function mix(a, b) { return a + b; }

test('0.1 + 0.2', () => {
  // TODO: Assert that mix(0.1, 0.2 is close to the expected number using .toBeCloseTo().
});

test('1.005 rounding', () => {
  // TODO: Assert that 1.005 is close to the expected number using .toBeCloseTo().
});
```
