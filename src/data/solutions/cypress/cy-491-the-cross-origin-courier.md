# The Cross-Origin Courier

**Level:** 491
**ID:** `cy-491`
**Difficulty:** hard
**XP:** 250
**Tags:** `cy.origin`, `cross-origin`, `same-origin`, `multi-domain`


## Objective

Use cy.origin() to visit and interact with a page on a different origin.

## Story

Some journeys cross domain boundaries. The Cross-Origin Courier masters cy.origin() — the spell that lets you interact with pages on different domains without violating the same-origin policy.

## Hints
1. cy.origin(url, () => { }) lets you run Cypress commands in a different origin context
2. Inside cy.origin(), all cy.* commands run against the new origin
3. You must pass any variables into cy.origin() via the args option: cy.origin(url, { args: { val } }, ({ val }) => { })

## Solution

```javascript
describe('The Cross-Origin Courier', () => {
  it('visits a cross-origin page with cy.origin', () => {
    cy.visit('/pages/level-01/');
    cy.origin('http://localhost:5000', () => {
      cy.visit('/pages/level-01/');
      cy.get('body').should('be.visible');
    });
  });
});
```

## Starter Code

```javascript
describe('The Cross-Origin Courier', () => {
  it('visits a cross-origin page with cy.origin', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.origin() to switch to a different domain
  });
});
```
