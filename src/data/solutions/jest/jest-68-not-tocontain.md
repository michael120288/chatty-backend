# not.toContain

**Level:** 68
**ID:** `jest-68`
**XP:** 100
**Tags:** `not`, `toContain`, `arrays`

## Objective

Use .not.toContain() to assert an array does not include a value.

## Story

The banned item must not appear in the hero's inventory.

## Hints
1. .not.toContain checks item is absent from array.
2. Also works on strings: expect(str).not.toContain(substr).
3. Uses strict equality for array item checks.

## Solution

```javascript
const inv=['sword','shield','potion'];
test('no cursed item',()=>{expect(inv).not.toContain('cursed ring');});
```

## Explanation

`@testing-library/react` renders components in a real DOM (jsdom). Use `screen` queries to find elements:

```
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

render(<LoginForm />);
await userEvent.type(screen.getByLabelText('Username'), 'wizard');
await userEvent.click(screen.getByRole('button', { name: 'Login' }));
expect(screen.getByText('Welcome!')).toBeInTheDocument();
```

## Starter Code

```javascript
const inventory = ['sword', 'shield', 'potion'];

test('no cursed item', () => {
  // TODO: Assert that inventory does not contain 'cursed ring'.
});
```
