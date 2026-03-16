# The Shape Shifter — sets viewport before visiting for consistent layout

**Level:** 69
**ID:** `cy-069`
**Difficulty:** medium
**XP:** 400
**Tags:** `cy.viewport`, `responsive`, `mobile`, `be.visible`, `media query`


## Objective

Set the viewport to 375x667 (mobile), then assert '#mobile-treasure' is visible.

## Story

The web shapeshifts depending on who is watching. Cypress's cy.viewport() changes the browser size instantly, revealing elements that are only visible on mobile screens.

## Hints
1. Use cy.viewport(width, height) to set the browser viewport size.
2. Set the viewport BEFORE visiting the page so CSS media queries apply correctly.
3. Assert with cy.get('#mobile-treasure').should('be.visible').

## Solution

```javascript
describe('The Shape Shifter', () => {
  it('sets viewport before visiting for consistent layout', () => {
      cy.viewport(375, 667);
      cy.visit('/pages/level-14/');
      cy.get('body').should('be.visible');
      cy.get('#mobile-treasure').should('exist');
    });
});
```

## Starter Code

```javascript
describe('The Shape Shifter', () => {
  it('sets viewport before visiting for consistent layout', () => {
    cy.visit('/pages/level-14/');
    // Hint: select "body" and assert it is visible
    // Hint: select "#mobile-treasure" and assert it exists in the DOM
  });
});
```
