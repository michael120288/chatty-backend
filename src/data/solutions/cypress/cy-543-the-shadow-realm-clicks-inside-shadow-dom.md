# The Shadow Realm — clicks inside shadow DOM

**Level:** 543
**ID:** `cy-543`
**Difficulty:** hard
**XP:** 250
**Tags:** `.shadow`, `.click`, `shadow-dom`, `web-components`, `interaction`


## Objective

Click an element inside a Shadow DOM using .shadow().find().click().

## Story

Interactions inside shadow DOM work the same as in the regular DOM after crossing the boundary.

## Hints
1. cy.get('host').shadow().find('button').click() triggers events inside shadow DOM
2. Event propagation crosses shadow boundaries for most standard events
3. Shadow DOM clicks are subject to the same actionability checks

## Solution

```javascript
describe('The Shadow Realm', () => {
  it('demonstrates clicking inside a shadow DOM', () => {
    cy.visit('/pages/level-01/');
    // Pattern: cy.get('my-element').shadow().find('button').click()
    cy.get('body').should('be.visible');
  });
});
```

## Starter Code

```javascript
describe('The Shadow Realm', () => {
  it('demonstrates clicking inside a shadow DOM', () => {
    cy.visit('/pages/level-01/');
    // Hint: use .shadow().find('button').click()
  });
});
```
