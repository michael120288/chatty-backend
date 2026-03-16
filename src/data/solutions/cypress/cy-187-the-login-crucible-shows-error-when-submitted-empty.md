# The Login Crucible — shows error when submitted empty

**Level:** 187
**ID:** `cy-187`
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
  it('shows error when submitted empty', () => {
      cy.mount(<LoginForm />);
      cy.get('[data-testid="submit-btn"]').click();
      cy.get('[data-testid="error-msg"]').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Login Crucible', () => {
  it('shows error when submitted empty', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
