# The DOM Navigator — match checks if element matches a CSS selector

**Level:** 302
**ID:** `cy-302`
**Difficulty:** medium
**XP:** 125
**Tags:** `assertions`, `chai-jquery`, `dom`, `match`, `have.descendants`, `selectors`


## Objective

Use match (CSS selector check), have.descendants, and be.empty to inspect DOM tree structure.

## Story

The guild hall's structure is complex — rooms within rooms, sections within sections. The DOM Navigator maps the descendants of each container and matches elements by CSS selector.

## Hints
1. match checks if the element itself matches the selector — like .matches() in native JS
2. have.descendants checks if any descendant elements match the selector (like .find())
3. Combine .match with compound selectors: .character.active checks for both classes

## Solution

```javascript
describe('The DOM Navigator', () => {
  it('match checks if element matches a CSS selector', () => {
      cy.get('#hero').should('match', '#hero');
      cy.get('#hero').should('match', '[data-type]');
      cy.get('#hero').should('match', '.character');
      cy.get('#hero').should('not.match', '.inactive');
    });
});
```

## Starter Code

```javascript
describe('The DOM Navigator', () => {
  it('match checks if element matches a CSS selector', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
