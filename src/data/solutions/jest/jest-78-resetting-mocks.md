# Resetting Mocks

**Level:** 78
**ID:** `jest-78`
**XP:** 110
**Tags:** `mockReset`, `mock`

## Objective

Use mockReset() to clear state AND remove implementation.

## Story

The weapon must be fully reset — no memory, no power. Use mockReset.

## Hints
1. mockReset() clears everything including return values.
2. After reset, mock returns undefined by default.
3. Use in afterEach to ensure clean state per test.

## Solution

```javascript
test('mock reset',()=>{const p=jest.fn().mockReturnValue(100);p();p.mockReset();expect(p).toHaveBeenCalledTimes(0);expect(p()).toBeUndefined();});
```

## Explanation

`fireEvent` from `@testing-library/react` dispatches synthetic DOM events:

```
import { render, screen, fireEvent } from '@testing-library/react';

render(<Counter />);
fireEvent.click(screen.getByRole('button', { name: 'Increment' }));
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

Prefer `userEvent` (from `@testing-library/user-event`) for more realistic interactions — it fires all the intermediate events (`mousedown`, `mouseup`, `click`, etc.).

## Starter Code

```javascript
test('mock reset', () => {
  const power = jest.fn().mockReturnValue(100);
  power();
  power.mockReset();
  // TODO: Assert that power was called exactly 0 times.
  // TODO: Assert that power() is undefined.
});
```
