# Clearing Mock State

**Level:** 77
**ID:** `jest-77`
**XP:** 110
**Tags:** `mockClear`, `mock`

## Objective

Use mockClear() to reset call history but keep return value.

## Story

Between battles, the hero resets. Clear a mock's recorded state without removing its implementation.

## Hints
1. mockClear() resets calls, instances, results — NOT implementation.
2. mockReset() also removes implementation/return values.
3. mockRestore() restores original (only for spyOn).

## Solution

```javascript
test('mock clear',()=>{const a=jest.fn().mockReturnValue('hit');a();a();expect(a).toHaveBeenCalledTimes(2);a.mockClear();expect(a).toHaveBeenCalledTimes(0);expect(a()).toBe('hit');});
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
test('mock clear', () => {
  const attack = jest.fn().mockReturnValue('hit');
  attack();
  attack();
  expect(attack).toHaveBeenCalledTimes(2);
  attack.mockClear();
  // TODO: Assert that attack was called exactly 0 times.
  // TODO: Assert that attack() equals 'hit' using .toBe().
});
```
