# Integer Boundaries

**Level:** 129
**ID:** `jest-129`
**XP:** 110
**Tags:** `numbers`, `boundary`, `clamp`

## Objective

Test boundary conditions with number clamping.

## Story

The dungeon score system has min and max integer bounds. Test the clamping.

## Hints
1. Test the three cases: below min, above max, within range.
2. Math.min/max handle boundary clamping.
3. toBe for exact number equality.

## Solution

```javascript
const clamp=(n,min,max)=>Math.min(Math.max(n,min),max);
test('below min',()=>{expect(clamp(-10,0,100)).toBe(0);});
test('above max',()=>{expect(clamp(200,0,100)).toBe(100);});
test('within range',()=>{expect(clamp(50,0,100)).toBe(50);});
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
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

test('below min', () => {
  // TODO: Assert that clamp(-10, 0, 100 equals 0 using .toBe().
});

test('above max', () => {
  // TODO: Assert that clamp(200, 0, 100 equals 100 using .toBe().
});

test('within range', () => {
  // TODO: Assert that clamp(50, 0, 100 equals 50 using .toBe().
});
```
