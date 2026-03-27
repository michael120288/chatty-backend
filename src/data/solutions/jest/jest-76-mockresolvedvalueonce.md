# mockResolvedValueOnce

**Level:** 76
**ID:** `jest-76`
**XP:** 120
**Tags:** `mockResolvedValueOnce`, `async`, `mock`

## Objective

Use mockResolvedValueOnce() for sequential async return values.

## Story

The oracle answers twice — once with hope, once with doom. Control async one-shots.

## Hints
1. mockResolvedValueOnce returns a resolved Promise once.
2. Chain multiple calls for sequential async values.
3. Combine with mockRejectedValueOnce for mixed scenarios.

## Solution

```javascript
test('oracle answers',async()=>{const ask=jest.fn();ask.mockResolvedValueOnce('victory');ask.mockResolvedValueOnce('defeat');await expect(ask()).resolves.toBe('victory');await expect(ask()).resolves.toBe('defeat');});
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
test('oracle answers', async () => {
  const ask = jest.fn();
  ask.mockResolvedValueOnce('victory');
  ask.mockResolvedValueOnce('defeat');
  // TODO: Assert that ask() equals 'victory' using .toBe().
  // TODO: Assert that ask() equals 'defeat' using .toBe().
});
```
