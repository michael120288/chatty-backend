# The Root Seeker — root inside within()

**Level:** 557
**ID:** `cy-557`
**Difficulty:** easy
**XP:** 150
**Tags:** `.root`, `.within`, `scoping`, `dom`


## Objective

Call cy.root() inside a .within() block and see it returns the scoped element.

## Story

Inside a .within() block, cy.root() returns the scoped element, not the document root. The Seeker uses this to escape the scope when needed.

## Hints
1. Inside .within($el => { cy.root() }), cy.root() returns $el
2. This lets you get a reference to the within scope
3. It is the equivalent of "return to the top of this scope"

## Solution

```javascript
describe('The Root Seeker', () => {
  it('cy.root() returns the scoped element inside .within()', () => {
    cy.visit('/pages/level-01/');
    cy.get('body').within(() => {
      cy.root().should('match', 'body');
    });
  });
});
```

## Starter Code

```javascript
describe('The Root Seeker', () => {
  it('cy.root() returns the scoped element inside .within()', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.root() inside a .within() block
  });
});
```
