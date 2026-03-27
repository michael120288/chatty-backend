# Async Error with try/catch

**Level:** 87
**ID:** `jest-87`
**XP:** 120
**Tags:** `async`, `try/catch`, `error`

## Objective

Use async/await with try/catch to assert async errors.

## Story

The async dungeon hatch throws if blocked. Use try/catch to verify.

## Hints
1. async/await lets you use try/catch naturally.
2. The catch block can contain expect calls.
3. Add expect.assertions(1) to ensure the catch block ran.

## Solution

```javascript
async function openHatch(l){if(l)throw new Error('Hatch is locked');return'open';}
test('locked hatch throws',async()=>{try{await openHatch(true);}catch(e){expect(e.message).toBe('Hatch is locked');}});
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
async function openHatch(locked) {
  if (locked) throw new Error('Hatch is locked');
  return 'open';
}

test('locked hatch throws', async () => {
  // TODO: try {
  //   await openHatch(true);
  // } catch (e) {
  // TODO: Assert that e.message equals 'Hatch is locked' using .toBe().
  // }
});
```
