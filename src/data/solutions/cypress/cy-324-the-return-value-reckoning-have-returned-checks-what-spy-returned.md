# The Return Value Reckoning — have.returned checks what spy returned

**Level:** 324
**ID:** `cy-324`
**Difficulty:** hard
**XP:** 175
**Tags:** `assertions`, `sinon-chai`, `have.returned`, `thrown`, `stubs`, `return-values`


## Objective

Use have.returned, always.returned, and thrown to assert on spy/stub return values and exceptions.

## Story

What did the spell return? Did the ritual throw an error? The Return Value Reckoning inspects what comes back from stubbed functions and whether exceptions were thrown.

## Hints
1. have.returned checks that the spy returned the specified value in AT LEAST one call
2. always.returned checks that ALL calls returned the value — even one different return fails
3. thrown checks for any thrown error; thrown(Type) checks the error type; thrown('msg') checks message

## Solution

```javascript
describe('The Return Value Reckoning', () => {
  it('have.returned checks what spy returned', () => {
      cy.window().then((win) => {
        const castSpy = cy.spy(win, 'castSpell');
        cy.get('#cast-btn').click();
        cy.wrap(castSpy).should('have.returned', 'Fireball cast successfully!');
      });
    });
});
```

## Starter Code

```javascript
describe('The Return Value Reckoning', () => {
  it('have.returned checks what spy returned', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
