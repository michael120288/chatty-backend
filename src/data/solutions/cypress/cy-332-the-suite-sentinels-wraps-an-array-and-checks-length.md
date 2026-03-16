# The Suite Sentinels — wraps an array and checks length

**Level:** 332
**ID:** `cy-332`
**Difficulty:** easy
**XP:** 100
**Tags:** `mocha`, `before`, `after`, `hooks`, `suite-lifecycle`, `setup`


## Objective

Use before() to set up shared state and after() to verify final state. Both must run successfully.

## Story

before() and after() are the gatekeepers of the suite — running once before all tests begin and once after all tests end. Use them for expensive setup and teardown that only needs to happen once.

## Hints
1. before() runs once — shared state mutations inside tests persist to subsequent tests
2. after() runs even if tests fail (unless --bail is set)
3. Use before() for expensive setup like seeding data; use beforeEach() when each test needs a fresh start

## Solution

```javascript
describe('The Suite Sentinels', () => {
  it('wraps an array and checks length', () => {
        cy.wrap(['fire', 'ice', 'thunder']).should('have.length', 3);
      });
});
```

## Starter Code

```javascript
describe('The Suite Sentinels', () => {
  it('wraps an array and checks length', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
