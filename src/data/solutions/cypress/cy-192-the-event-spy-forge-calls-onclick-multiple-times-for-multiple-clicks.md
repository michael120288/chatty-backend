# The Event Spy Forge — calls onClick multiple times for multiple clicks

**Level:** 192
**ID:** `cy-192`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.mount`, `cy.spy`, `event-handlers`, `props`, `component testing`


## Objective

Use cy.spy() as a component prop to verify event handler callbacks are called with the correct arguments when the user interacts with the component.

## Story

Callbacks carry meaning. The Event Spy Forge mounts components with cy.spy() wired directly into event handler props — so you can assert not just that a function was called, but exactly what arguments it received.

## Hints
1. cy.spy() returns a sinon spy — pass it directly as a prop or wrap it in an arrow function
2. Use .as('name') on the spy so you can reference it later with cy.get('@name')
3. cy.get('@spy').its('lastCall.args.0') accesses the first argument of the most recent call
4. cy.get('@spy').should('have.been.calledWith', value) asserts the spy was called with that exact argument at least once

## Solution

```javascript
import React from 'react';
import { SpellButton } from '../../components/SpellButton.jsx';

describe('The Event Spy Forge', () => {
  it('calls onClick multiple times for multiple clicks', () => {
      const onClick = cy.stub().as('clickSpy');
      cy.mount(<SpellButton label="Cast Fireball" onClick={onClick} />);
      cy.get('[data-testid="spell-btn"]').click().click().click();
      cy.get('@clickSpy').should('have.been.calledThrice');
    });
});
```

## Starter Code

```javascript
describe('The Event Spy Forge', () => {
  it('calls onClick multiple times for multiple clicks', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
