# expect.assertions with async

**Level:** 88
**ID:** `jest-88`
**XP:** 120
**Tags:** `expect.assertions`, `async`

## Objective

Use expect.assertions(n) to ensure async assertions execute.

## Story

The test must prove it ran all the checks — use expect.assertions to enforce it.

## Hints
1. expect.assertions(1) ensures exactly one assertion is called.
2. If the catch block never runs, the test fails due to 0 assertions.
3. Great guard for async error paths.

## Solution

```javascript
async function fetchData(){return Promise.reject(new Error('network error'));}
test('async assertions run',async()=>{expect.assertions(1);try{await fetchData();}catch(e){expect(e.message).toBe('network error');}});
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
async function fetchData() {
  return Promise.reject(new Error('network error'));
}

test('async assertions run', async () => {
  expect.assertions(1);
  // TODO:
  try {
    await fetchData();
  } catch (e) {
    expect(e.message).toBe('network error');
  }
});
```
