# not.toEqual

**Level:** 67
**ID:** `jest-67`
**XP:** 100
**Tags:** `not`, `toEqual`

## Objective

Use .not.toEqual() to assert two objects have different values.

## Story

Two spells must have different effects. Deep-compare and assert they differ.

## Hints
1. .not.toEqual does deep inequality check.
2. .toEqual and .not.toEqual are mirrors.
3. {damage:10} and {damage:20} are not deeply equal.

## Solution

```javascript
const s1={damage:10},s2={damage:20};
test('spells differ',()=>{expect(s1).not.toEqual(s2);});
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
const spell1 = { damage: 10 };
const spell2 = { damage: 20 };

test('spells differ', () => {
  // TODO: Assert that spell1 does not deeply equal the expected value using .not.toEqual().
});
```
