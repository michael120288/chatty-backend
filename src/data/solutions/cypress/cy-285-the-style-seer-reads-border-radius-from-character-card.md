# The Style Seer — reads border-radius from character card

**Level:** 285
**ID:** `cy-285`
**Difficulty:** easy
**XP:** 100
**Tags:** `assertions`, `chai-jquery`, `css`, `have.css`, `computed-styles`, `dom`


## Objective

Use have.css to verify computed CSS property values on DOM elements.

## Story

Beneath the visible surface lies a world of computed styles. The Style Seer pierces through CSS declarations to verify the exact rendering of each element.

## Hints
1. have.css reads COMPUTED styles — hex colors are reported as rgb(), shorthand expands to longhands
2. Colors must match exactly as rgb(): #ffd700 becomes rgb(255, 215, 0)
3. Without a second argument, have.css just checks the property has a non-empty value

## Solution

```javascript
describe('The Style Seer', () => {
  it('reads border-radius from character card', () => {
      cy.get('#hero').should('have.css', 'border-radius', '8px');
    });
});
```

## Starter Code

```javascript
describe('The Style Seer', () => {
  it('reads border-radius from character card', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
