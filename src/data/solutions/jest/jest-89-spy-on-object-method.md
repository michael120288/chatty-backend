# Spy on Object Method

**Level:** 89
**ID:** `jest-89`
**XP:** 120
**Tags:** `jest.spyOn`, `spy`, `method`

## Objective

Use jest.spyOn to spy on an object method while keeping the real implementation.

## Story

Track when the healer uses their ability, without changing their real power.

## Hints
1. jest.spyOn wraps the real method — it still runs unless you stub it.
2. Always call mockRestore() to clean up after a spy.
3. Use mockImplementation to override the real function.

## Solution

```javascript
const healer={heal(a){return`Healed ${a} HP`;}};
test('heal was called',()=>{const spy=jest.spyOn(healer,'heal');healer.heal(50);expect(spy).toHaveBeenCalledWith(50);expect(spy).toHaveBeenCalledTimes(1);spy.mockRestore();});
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
const healer = {
  heal(amount) { return `Healed ${amount} HP`; }
};

test('heal was called', () => {
  const spy = jest.spyOn(healer, 'heal');
  healer.heal(50);
  // TODO: Assert that spy was called with the expected arguments.
  // TODO: Assert that spy was called exactly 1 times.
  spy.mockRestore();
});
```
