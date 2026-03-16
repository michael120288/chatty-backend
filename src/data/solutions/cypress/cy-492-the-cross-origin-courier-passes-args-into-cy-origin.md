# The Cross-Origin Courier — passes args into cy.origin

**Level:** 492
**ID:** `cy-492`
**Difficulty:** hard
**XP:** 250
**Tags:** `cy.origin`, `args`, `cross-origin`


## Objective

Pass variables into cy.origin() using the args option.

## Story

Variables from the outer test scope must be explicitly passed into cy.origin() via the args option. The courier learns to carry data across domain boundaries.

## Hints
1. cy.origin(url, { args: { myVar } }, ({ myVar }) => { cy.get(myVar) })
2. args must be serialisable — no functions or class instances
3. Destructure the args in the callback parameter

## Solution

```javascript
describe('The Cross-Origin Courier', () => {
  it('passes args into cy.origin', () => {
    const selector = 'body';
    cy.origin('http://localhost:5000', { args: { selector } }, ({ selector }) => {
      cy.visit('/pages/level-01/');
      cy.get(selector).should('be.visible');
    });
  });
});
```

## Starter Code

```javascript
describe('The Cross-Origin Courier', () => {
  it('passes args into cy.origin', () => {
    cy.visit('/pages/level-01/');
    // Hint: pass a selector via { args } into cy.origin()
  });
});
```
