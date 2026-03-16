# The Quest Portal — registration form exists on page load

**Level:** 217
**ID:** `cy-217`
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
  it('registration form exists on page load', () => {
      cy.visit('/pages/level-74/');
      cy.get('#adventurer-name').should('exist');
      cy.get('#hero-class').should('exist');
      cy.get('#register-btn').should('be.enabled');
    });
});
```

## Starter Code

```javascript
describe('Quest Portal — Full Journey', () => {
  it('registration form exists on page load', () => {
    cy.visit('/pages/level-74/');
    // Hint: select "#adventurer-name" and assert it exists in the DOM
    // Hint: select "#hero-class" and assert it exists in the DOM
    // Hint: use cy.get()
  });
});
```
