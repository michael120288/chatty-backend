# The Annotation Scribe

**Level:** 521
**ID:** `cy-521`
**Difficulty:** easy
**XP:** 100
**Tags:** `cy.log`, `logging`, `debugging`, `readability`


## Objective

Use cy.log() to add a custom message to the Cypress command log.

## Story

Tests tell stories. The Annotation Scribe uses cy.log() to add readable messages to the Cypress command log — marking key steps without affecting test execution.

## Hints
1. cy.log('message') adds a blue annotation in the command log
2. cy.log() does not affect test pass/fail status
3. Use template literals for dynamic messages: cy.log(`User: ${name}`)

## Solution

```javascript
describe('The Annotation Scribe', () => {
  it('logs a message to the command log', () => {
    cy.log('Starting the test');
    cy.visit('/pages/level-01/');
    cy.log('Page loaded successfully');
    cy.get('body').should('be.visible');
  });
});
```

## Starter Code

```javascript
describe('The Annotation Scribe', () => {
  it('logs a message to the command log', () => {
    cy.visit('/pages/level-01/');
    // Hint: call cy.log('Step 1: visiting the page') before cy.visit()
  });
});
```
