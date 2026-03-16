# The Chronicler — takes a named screenshot for reference

**Level:** 33
**ID:** `cy-033`
**Difficulty:** medium
**XP:** 275
**Tags:** `cy.screenshot`, `visual testing`, `screenshot`, `body`


## Objective

Navigate to the gallery page, take a screenshot, and verify the page body exists.

## Story

History must be preserved. The Chroniclers capture moments in time — frozen images of the web's ever-changing face. Cypress's cy.screenshot() is your wand of visual truth.

## Hints
1. Use cy.screenshot('name') to take a named screenshot of the current state.
2. Screenshots are saved automatically — no file handling needed.
3. Assert the page loaded correctly with cy.get('body').should('exist').

## Solution

```javascript
describe('The Chronicler', () => {
  it('takes a named screenshot for reference', () => {
      cy.visit('/pages/level-07/');
      cy.get('h1').should('be.visible');
      cy.screenshot('gallery-header');
    });
});
```

## Starter Code

```javascript
describe('The Chronicler', () => {
  it('takes a named screenshot for reference', () => {
    cy.visit('/pages/level-07/');
    // Hint: select "h1" and assert it is visible
    // Hint: take a screenshot
  });
});
```
