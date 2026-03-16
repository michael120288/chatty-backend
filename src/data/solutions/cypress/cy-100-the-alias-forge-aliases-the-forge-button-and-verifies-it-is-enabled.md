# The Alias Forge — aliases the forge button and verifies it is enabled

**Level:** 100
**ID:** `cy-100`
**Difficulty:** medium
**XP:** 185
**Tags:** `.as`, `cy.get('@alias')`, `aliases`, `reuse`


## Objective

Use .as() to alias elements and cy.get('@alias') to reuse them across multiple assertions.

## Story

In the forge, a master craftsman names their tools. With .as() you create an alias for any subject, then retrieve it later with cy.get('@alias') — even across hooks and after the element has been re-queried.

## Hints
1. .as('name') saves the current subject as an alias
2. cy.get('@name') retrieves the saved alias
3. Aliases are useful in beforeEach hooks so tests can share setup without repeating selectors

## Solution

```javascript
describe('The Alias Forge', () => {
  it('aliases the forge button and verifies it is enabled', () => {
      cy.visit('/pages/level-63/');
      cy.get('#forge-btn').as('forgeBtn');
      cy.get('@forgeBtn').should('be.enabled');
      cy.get('@forgeBtn').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Alias Forge', () => {
  it('aliases the forge button and verifies it is enabled', () => {
    cy.visit('/pages/level-63/');
    // Hint: use cy.get()
    // Hint: use cy.get()
    // Hint: select "@forgeBtn" and assert it is visible
  });
});
```
