# The Hero Registry — table is empty before the load button is clicked

**Level:** 130
**ID:** `cy-130`
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
  it('table is empty before the load button is clicked', () => {
      cy.fixture('heroes.json').then((heroData) => {
        cy.intercept('GET', '/api/heroes', { body: heroData }).as('getHeroes');
      });
      cy.visit('/pages/level-69/');
      cy.get('#heroes-tbody tr').should('have.length', 0);
    });
});
```

## Starter Code

```javascript
describe('The Hero Registry', () => {
  it('table is empty before the load button is clicked', () => {
    cy.visit('/pages/level-69/');
    // Hint: select "#heroes-tbody tr" and assert there are 0 of them
  });
});
```
