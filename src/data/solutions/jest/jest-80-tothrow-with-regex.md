# toThrow with Regex

**Level:** 80
**ID:** `jest-80`
**XP:** 110
**Tags:** `toThrow`, `regex`, `error`

## Objective

Use toThrow(/regex/) to pattern-match error messages.

## Story

The incantation error message follows a pattern. Match it with a regular expression.

## Hints
1. toThrow(/pattern/) tests message against regex.
2. The regex only needs to match a substring.
3. Use ^ and $ anchors for exact matches.

## Solution

```javascript
function cast(s){if(!s)throw new Error('Spell cannot be empty');return'casting';}
test('empty spell error',()=>{expect(()=>cast('')).toThrow(/cannot be empty/);});
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
function cast(spell) {
  if (!spell) throw new Error('Spell cannot be empty');
  return 'casting';
}

test('empty spell error', () => {
  // TODO: Assert that the function throws the expected error using .toThrow().
});
```
