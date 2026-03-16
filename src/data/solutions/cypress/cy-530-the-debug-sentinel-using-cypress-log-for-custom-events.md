# The Debug Sentinel — using Cypress.log for custom events

**Level:** 530
**ID:** `cy-530`
**Difficulty:** hard
**XP:** 250
**Tags:** `Cypress.log`, `custom-commands`, `debugging`, `logging`


## Objective

Create a custom Cypress log entry using Cypress.log().

## Story

Advanced sentinels create custom log entries with Cypress.log(). This lets plugins and custom commands appear in the timeline.

## Hints
1. Cypress.log({ name, message }) creates a custom timeline entry
2. Useful inside custom commands to make them visible in the runner
3. Different from cy.log() — this is the low-level API

## Solution

```javascript
describe('The Debug Sentinel', () => {
  it('creates a custom Cypress log entry', () => {
    Cypress.log({ name: 'custom-step', message: ['hello from custom log'] });
    cy.visit('/pages/level-01/');
    cy.get('body').should('be.visible');
  });
});
```

## Starter Code

```javascript
describe('The Debug Sentinel', () => {
  it('creates a custom Cypress log entry', () => {
    cy.visit('/pages/level-01/');
    // Hint: call Cypress.log({ name: 'custom', message: ['hello'] })
  });
});
```
