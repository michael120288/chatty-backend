# not.toBe

**Level:** 66
**ID:** `jest-66`
**XP:** 100
**Tags:** `not`, `toBe`, `reference`

## Objective

Use .not.toBe() to assert two objects are not the same reference.

## Story

Two heroes must be different people. Assert they are NOT the same reference.

## Hints
1. .not inverts any matcher.
2. .toBe uses Object.is (reference equality).
3. {} !== {} even if contents match — that's what not.toBe checks.

## Solution

```javascript
const h1={name:'Alice'},h2={name:'Alice'};
test('different references',()=>{expect(h1).not.toBe(h2);});
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
const hero1 = { name: 'Alice' };
const hero2 = { name: 'Alice' };

test('different references', () => {
  // TODO: Assert that hero1 does not equal hero2 using .not.toBe().
});
```
