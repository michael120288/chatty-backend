# not.toBeNull and not.toBeUndefined

**Level:** 69
**ID:** `jest-69`
**XP:** 100
**Tags:** `not`, `toBeNull`, `toBeUndefined`

## Objective

Use .not.toBeNull() and .not.toBeUndefined() together.

## Story

The quest result must actually exist — it must be neither null nor undefined.

## Hints
1. .not.toBeNull() — value is not null.
2. .not.toBeUndefined() — value is not undefined.
3. toBeDefined() is the short form for not.toBeUndefined.

## Solution

```javascript
function findQuest(id){return id===1?{name:'Slay the Dragon'}:null;}
test('quest exists',()=>{const r=findQuest(1);expect(r).not.toBeNull();expect(r).not.toBeUndefined();});
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
function findQuest(id) {
  return id === 1 ? { name: 'Slay the Dragon' } : null;
}

test('quest exists', () => {
  const result = findQuest(1);
  // TODO: Assert that result is not null.
  // TODO: Assert that result is undefined.
});
```
