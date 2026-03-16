# The Spell Counter — resets to 0 when reset is clicked

**Level:** 182
**ID:** `cy-182`
**Difficulty:** medium
**XP:** 200
**Tags:** `state`, `click events`, `cy.mount`, `component testing`, `stateful`


## Objective

Mount SpellCounter and test that clicking Cast increments the count, and clicking Reset returns it to zero.

## Story

State is where components come alive. The SpellCounter tracks how many times a spell has been cast — click Cast to increment, click ↺ to reset. Test that state transitions work correctly in isolation.

## Hints
1. Component state updates are synchronous in React — assertions immediately after .click() work
2. Chain multiple .click() calls to fire several clicks in a row
3. Test edge cases: disabled buttons, initial state, state after reset

## Solution

```javascript
import React from 'react';
import { SpellCounter } from '../../components/SpellCounter.jsx';

describe('SpellCounter', () => {
  it('resets to 0 when reset is clicked', () => {
      cy.mount(<SpellCounter spellName="Blizzard" initialCount={5} />);
      cy.get('[data-testid="count-display"]').should('have.text', '5');
      cy.get('[data-testid="reset-btn"]').click();
      cy.get('[data-testid="count-display"]').should('have.text', '0');
    });
});
```

## Starter Code

```javascript
describe('SpellCounter', () => {
  it('resets to 0 when reset is clicked', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
