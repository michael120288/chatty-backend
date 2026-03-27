# Spy and Override Return

**Level:** 90
**ID:** `jest-90`
**XP:** 120
**Tags:** `jest.spyOn`, `mockReturnValue`, `spy`

## Objective

Use jest.spyOn with mockReturnValue to override a method's return.

## Story

The oracle's real answer is hidden. Override it with a controlled response.

## Hints
1. Chain .mockReturnValue() directly on spyOn for immediate stubbing.
2. spy.mockRestore() restores the original implementation.
3. Without mockRestore, the stub persists between tests.

## Solution

```javascript
const oracle={predict(){return Math.random()>0.5?'victory':'defeat';}};
test('controlled prophecy',()=>{const spy=jest.spyOn(oracle,'predict').mockReturnValue('victory');expect(oracle.predict()).toBe('victory');expect(spy).toHaveBeenCalled();spy.mockRestore();});
```

## Explanation

`waitFor` from `@testing-library/react` retries an assertion until it passes or times out:

```
import { render, screen, waitFor } from '@testing-library/react';

it('shows success after async save', async () => {
  render(<SaveButton />);
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  await waitFor(() => {
    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });
});
```

Use `waitFor` when an action triggers async state updates (API calls, timers, etc.).

## Starter Code

```javascript
const oracle = {
  predict() { return Math.random() > 0.5 ? 'victory' : 'defeat'; }
};

test('controlled prophecy', () => {
  const spy = jest.spyOn(oracle, 'predict').mockReturnValue('victory');
  // TODO: Assert that oracle.predict( equals 'victory' using .toBe().
  // TODO: Assert that spy was called.
  spy.mockRestore();
});
```
