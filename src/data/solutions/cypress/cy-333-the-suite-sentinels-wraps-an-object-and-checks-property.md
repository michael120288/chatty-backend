# The Suite Sentinels — wraps an object and checks property

**Level:** 333
**ID:** `cy-333`
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
  it('wraps an object and checks property', () => {
        cy.wrap({ name: 'Aria', xp: 100 }).should('have.property', 'name', 'Aria');
      });
});
```

## Starter Code

```javascript
describe('The Suite Sentinels', () => {
  it('wraps an object and checks property', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
