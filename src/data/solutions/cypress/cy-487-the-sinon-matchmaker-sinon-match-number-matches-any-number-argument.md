# The Sinon Matchmaker — sinon.match.number matches any number argument

**Level:** 487
**ID:** `cy-487`
**Difficulty:** hard
**XP:** 225
**Tags:** `cy.stub`, `cy.spy`, `sinon.match`, `matchers`, `calledWith`


## Objective

Use sinon matchers inside calledWith assertions to verify that stubs and spies are called with arguments matching a specific type or shape.

## Story

Exact equality is too rigid. The Sinon Matchmaker wields flexible matchers — sinon.match.string, sinon.match.object, sinon.match.has() — to assert that a stub was called with the right shape of argument, not necessarily the exact value.

## Hints
1. sinon.match.string, sinon.match.number, sinon.match.object, sinon.match.array are type matchers
2. sinon.match.has(key, value) checks that the argument object has a specific property with that value
3. sinon.match(fn, description) lets you write a custom predicate — the description appears in error messages

## Solution

```javascript
describe('The Sinon Matchmaker', () => {
  it('sinon.match.number matches any number argument', () => {
      cy.visit('/pages/level-08/');
      cy.window().then((win) => {
        const stub = cy.stub(win, 'setPower');
        win.setPower(9000);
        cy.wrap(stub).should('have.been.calledWithMatch', Cypress.sinon.match.number);
      });
    });
});
```

## Starter Code

```javascript
describe('The Sinon Matchmaker', () => {
  it('sinon.match.number matches any number argument', () => {
    cy.visit('/pages/level-08/');
    // Hint: use cy.window()
    // Hint: stub the method
    // Hint: use cy.wrap()
  });
});
```
