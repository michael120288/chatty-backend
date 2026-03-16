# The Hero Registry — fixture provides deterministic test data

**Level:** 128
**ID:** `cy-128`
**Difficulty:** hard
**XP:** 200
**Tags:** `cy.fixture`, `cy.intercept`, `network mocking`, `fixtures`, `API`


## Objective

Use cy.fixture() to load heroes.json and cy.intercept() to mock the /api/heroes endpoint, then verify the table renders the fixture data.

## Story

The hero registry fetches its data from a distant API. A wise tester never relies on live data — they use cy.fixture() to load test data and cy.intercept() to serve it, ensuring consistent and predictable results.

## Hints
1. cy.fixture('heroes.json') loads the fixture from the cypress/fixtures/ folder
2. cy.intercept() must be set up before the network request is made
3. Use cy.wait('@alias') to pause until the intercepted request completes

## Solution

```javascript
describe('The Hero Registry', () => {
  it('fixture provides deterministic test data', () => {
      cy.fixture('heroes.json').then((heroData) => {
        expect(heroData).to.have.length(3);
      });
    });
});
```

## Starter Code

```javascript
describe('The Hero Registry', () => {
  it('fixture provides deterministic test data', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
