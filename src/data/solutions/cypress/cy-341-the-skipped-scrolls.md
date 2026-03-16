# The Skipped Scrolls

**Level:** 341
**ID:** `cy-341`
**Difficulty:** easy
**XP:** 100
**Tags:** `mocha`, `it.skip`, `xit`, `retries`, `pending`, `test-organisation`


## Objective

Use it.skip() to mark tests as pending and this.retries() to configure retry logic. All non-skipped tests must pass.

## Story

Not every test must run today. it.skip() marks a test as pending — it shows in the report but does not execute. this.retries() tells Cypress how many times to retry a flaky test before giving up.

## Hints
1. it.skip() and xit() are identical — both mark the test as pending
2. this.retries(N) requires a regular function() not an arrow () => because it needs 'this'
3. describe.skip() skips ALL tests inside that suite block

## Solution

```javascript
describe('The Skipped Scrolls', () => {
  it('runs a normal test', () => {
      cy.wrap(1 + 1).should('equal', 2);
    });
});
```

## Starter Code

```javascript
describe('The Skipped Scrolls', () => {
  it('runs a normal test', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
