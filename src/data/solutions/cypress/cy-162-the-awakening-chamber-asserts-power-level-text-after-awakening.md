# The Awakening Chamber — asserts power level text after awakening

**Level:** 162
**ID:** `cy-162`
**Difficulty:** medium
**XP:** 180
**Tags:** `retry-ability`, `timeout`, `async`, `should`, `no-wait`


## Objective

Click the awaken button and assert on content that appears after a 2-second delay — without using cy.wait() with a fixed number.

## Story

Content that appears asynchronously is the bane of flaky tests — unless you understand retry-ability. Cypress automatically retries assertions until they pass or the timeout is reached. No sleep() spells required.

## Hints
1. Cypress retries .should() assertions automatically — do not use cy.wait(fixedMs) for async content
2. Use { timeout: N } on cy.get() to increase the retry window for slow elements
3. cy.wrap(value).should() also retries — wrapping a value makes it retry-able

## Solution

```javascript
describe('The Awakening Chamber', () => {
  it('asserts power level text after awakening', () => {
      cy.visit('/pages/level-73/');
      cy.get('#awaken-btn').click();
      cy.get('#power-level', { timeout: 5000 }).should('have.text', 'OVER 9000');
    });
});
```

## Starter Code

```javascript
describe('The Awakening Chamber', () => {
  it('asserts power level text after awakening', () => {
    cy.visit('/pages/level-73/');
    // Hint: click the element "#awaken-btn"
    // Hint: use cy.get()
  });
});
```
