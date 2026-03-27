# toBeDefined

**Level:** 70
**ID:** `jest-70`
**XP:** 100
**Tags:** `toBeDefined`, `toBeUndefined`

## Objective

Use toBeDefined() to verify a value is not undefined.

## Story

The merchant must have a price set before selling. Verify the price is defined.

## Hints
1. toBeDefined() — not undefined.
2. toBeUndefined() — is undefined.
3. These are opposites of each other.

## Solution

```javascript
function getPrice(i){const p={sword:100,shield:80};return p[i];}
test('sword has a price',()=>{expect(getPrice('sword')).toBeDefined();});
test('unknown item has no price',()=>{expect(getPrice('wand')).toBeUndefined();});
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
function getPrice(item) {
  const prices = { sword: 100, shield: 80 };
  return prices[item];
}

test('sword has a price', () => {
  // TODO: Assert that getPrice('sword' is defined (not undefined).
});

test('unknown item has no price', () => {
  // TODO: Assert that getPrice('wand' is undefined.
});
```
