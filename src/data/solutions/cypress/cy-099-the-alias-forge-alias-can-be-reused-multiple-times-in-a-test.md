# The Alias Forge — alias can be reused multiple times in a test

**Level:** 99
**ID:** `cy-099`
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
  it('alias can be reused multiple times in a test', () => {
      cy.visit('/pages/level-63/');
      cy.get('#rune-list').as('runeList');
      cy.get('@runeList').should('be.visible');
      cy.get('@runeList').find('.rune-item').should('have.length', 3);
      cy.get('@runeList').find('.rune-name').first().should('exist');
    });
});
```

## Starter Code

```javascript
describe('The Alias Forge', () => {
  it('alias can be reused multiple times in a test', () => {
    cy.visit('/pages/level-63/');
    // Hint: use cy.get()
    // Hint: select "@runeList" and assert it is visible
    // Hint: use cy.get()
    // Hint: use cy.get()
  });
});
```
