# The Root Seeker — root vs document()

**Level:** 559
**ID:** `cy-559`
**Difficulty:** easy
**XP:** 150
**Tags:** `cy.root`, `cy.document`, `dom`, `comparison`


## Objective

Compare cy.root() and cy.document() to understand what each yields.

## Story

The Seeker compares cy.root() with cy.document() — both give access to the page top, but via different yields.

## Hints
1. cy.root() yields the <html> DOM element
2. cy.document() yields the document object (not a DOM element)
3. cy.document().its('documentElement') equals cy.root()

## Solution

```javascript
describe('The Root Seeker', () => {
  it('compares cy.root() with cy.document()', () => {
    cy.visit('/pages/level-01/');
    cy.document().should('have.property', 'documentElement');
    cy.root().should('match', 'html');
  });
});
```

## Starter Code

```javascript
describe('The Root Seeker', () => {
  it('compares cy.root() with cy.document()', () => {
    cy.visit('/pages/level-01/');
    // Hint: assert cy.document() is not null and cy.root() matches 'html'
  });
});
```
