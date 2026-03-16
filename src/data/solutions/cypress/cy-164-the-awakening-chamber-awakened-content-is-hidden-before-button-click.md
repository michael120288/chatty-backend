# The Awakening Chamber — awakened content is hidden before button click

**Level:** 164
**ID:** `cy-164`
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
  it('awakened content is hidden before button click', () => {
      cy.visit('/pages/level-73/');
      cy.get('#awakened-content').should('not.be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Awakening Chamber', () => {
  it('awakened content is hidden before button click', () => {
    cy.visit('/pages/level-73/');
    // Hint: use cy.get()
  });
});
```
