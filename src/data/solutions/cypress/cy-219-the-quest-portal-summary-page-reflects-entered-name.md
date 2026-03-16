# The Quest Portal — summary page reflects entered name

**Level:** 219
**ID:** `cy-219`
**Difficulty:** hard
**XP:** 500
**Tags:** `e2e`, `multi-page`, `forms`, `navigation`, `localStorage`, `full-journey`


## Objective

Complete a full 3-page journey: fill the registration form, verify the confirmation summary, navigate to the result page, and claim the reward.

## Story

A true end-to-end test follows a user through an entire journey — form submission, page transitions, and final state verification. The Quest Portal spans three pages: registration, confirmation, and the adventure result.

## Hints
1. Use cy.clearLocalStorage() in beforeEach to ensure a clean state on each run
2. cy.url().should('include', 'confirm.html') waits until navigation completes before asserting
3. State is passed between pages via localStorage — the summary page reads what registration saved

## Solution

```javascript
describe('Quest Portal — Full Journey', () => {
  it('summary page reflects entered name', () => {
      cy.visit('/pages/level-74/');
      cy.get('#adventurer-name').type('Lyria the Bold');
      cy.get('#hero-class').select('Mage');
      cy.get('[value="legendary"]').check();
      cy.get('#register-btn').click();
      cy.get('#summary-name').should('have.text', 'Lyria the Bold');
    });
});
```

## Starter Code

```javascript
describe('Quest Portal — Full Journey', () => {
  it('summary page reflects entered name', () => {
    cy.visit('/pages/level-74/');
    // Hint: type "Lyria the Bold" into "#adventurer-name"
    // Hint: select option "Mage" from "#hero-class"
    // Hint: use cy.get()
    // Hint: click the element "#register-btn"
    // Hint: select "#summary-name" and assert its text equals "Lyria the Bold"
  });
});
```
