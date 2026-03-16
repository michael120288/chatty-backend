# The Asserter

**Level:** 16
**ID:** `cy-016`
**Difficulty:** medium
**XP:** 200
**Tags:** `should`, `have.text`, `have.class`, `assertions`, `DOM verification`


## Objective

Assert the page h1 has text 'Hall of Truth' and the hero badge has class 'badge-gold'.

## Story

In the Hall of Truth, nothing is taken at face value. Cypress's should() command is your truth-verifying wand. Only by confirming what truly exists can you advance.

## Hints
1. Use cy.get('h1').should('have.text', 'Hall of Truth') to assert exact text.
2. Use cy.get('#hero-badge').should('have.class', 'badge-gold') to assert a CSS class.
3. Both assertions must pass for the test to succeed.

## Solution

```javascript
describe('The Asserter', () => {
  it('verifies page h1 text', () => {
      cy.visit('/pages/level-04/');
      cy.get('h1').should('have.text', 'Hall of Truth');
    });
});
```

## Starter Code

```javascript
describe('The Asserter', () => {
  it('verifies page h1 text', () => {
    cy.visit('/pages/level-04/');
    // Hint: select "h1" and assert its text equals "Hall of Truth"
  });
});
```
