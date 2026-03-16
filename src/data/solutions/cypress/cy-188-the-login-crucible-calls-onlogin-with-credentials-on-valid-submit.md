# The Login Crucible — calls onLogin with credentials on valid submit

**Level:** 188
**ID:** `cy-188`
**Difficulty:** hard
**XP:** 205
**Tags:** `forms`, `validation`, `cy.stub`, `callbacks`, `cy.mount`, `component testing`


## Objective

Mount LoginForm and test validation errors, successful submission, and the onLogin callback using cy.stub().

## Story

Forms are a crucible where user input meets component logic. The LoginForm validates, reports errors, and calls callbacks — all testable in isolation without any server or router needed.

## Hints
1. Pass cy.stub() directly as a prop to capture callback invocations
2. Test the error path first, then the success path — each it() block mounts a fresh component
3. Use .should('not.exist') to confirm error/success messages are absent in the other scenario

## Solution

```javascript
import React from 'react';
import { LoginForm } from '../../components/LoginForm.jsx';

describe('The Login Crucible', () => {
  it('calls onLogin with credentials on valid submit', () => {
      const onLogin = cy.stub().as('loginStub');
      cy.mount(<LoginForm onLogin={onLogin} />);
      cy.get('[data-testid="username-input"]').type('archmage');
      cy.get('[data-testid="password-input"]').type('fireball123');
      cy.get('[data-testid="submit-btn"]').click();
      cy.get('@loginStub').should('have.been.calledOnce');
    });
});
```

## Starter Code

```javascript
describe('The Login Crucible', () => {
  it('calls onLogin with credentials on valid submit', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
