# Return a Rejected Promise

**Level:** 86
**ID:** `jest-86`
**XP:** 120
**Tags:** `rejects`, `toThrow`, `async`

## Objective

Return a rejected promise and assert with .rejects.toThrow().

## Story

The forbidden spell always fails. Return the rejected promise and catch with .rejects.

## Hints
1. Return the assertion so Jest waits for it.
2. rejects.toThrow() unwraps the rejection and checks the error.
3. Alternatively use async/await with try/catch.

## Solution

```javascript
function forbiddenSpell(){return Promise.reject(new Error('Forbidden'));}
test('spell is forbidden',()=>{return expect(forbiddenSpell()).rejects.toThrow('Forbidden');});
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
function forbiddenSpell() {
  return Promise.reject(new Error('Forbidden'));
}

test('spell is forbidden', () => {
  // TODO: Assert that the function throws the expected error.
});
```
