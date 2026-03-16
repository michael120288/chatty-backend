# The Hero Registry — first row contains Aria Stormwind

**Level:** 127
**ID:** `cy-127`
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
  it('first row contains Aria Stormwind', () => {
      cy.fixture('heroes.json').then((heroData) => {
        cy.intercept('GET', '/api/heroes', { body: heroData }).as('getHeroes');
      });
      cy.visit('/pages/level-69/');
      cy.get('#load-heroes-btn').click();
      cy.wait('@getHeroes');
      cy.get('#heroes-tbody tr').first().contains('Aria Stormwind');
    });
});
```

## Starter Code

```javascript
describe('The Hero Registry', () => {
  it('first row contains Aria Stormwind', () => {
    cy.visit('/pages/level-69/');
    // Hint: click the element "#load-heroes-btn"
    // Hint: wait for a request or timeout
    // Hint: use cy.get()
  });
});
```
