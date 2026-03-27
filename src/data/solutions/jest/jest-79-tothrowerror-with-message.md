# toThrowError with Message

**Level:** 79
**ID:** `jest-79`
**XP:** 110
**Tags:** `toThrow`, `error`, `message`

## Objective

Use toThrow() with a string to match the error message.

## Story

The vault throws a specific error when the wrong key is used. Verify the message.

## Hints
1. toThrow(string) checks the error message contains that string.
2. toThrow(ErrorClass) checks the instance type.
3. toThrow(/regex/) matches with a regular expression.

## Solution

```javascript
function openVault(k){if(k!=='secret')throw new Error('Invalid key');return'open';}
test('wrong key throws message',()=>{expect(()=>openVault('wrong')).toThrow('Invalid key');});
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
function openVault(key) {
  if (key !== 'secret') throw new Error('Invalid key');
  return 'open';
}

test('wrong key throws message', () => {
  // TODO: Assert that the function throws the expected error using .toThrow().
});
```
