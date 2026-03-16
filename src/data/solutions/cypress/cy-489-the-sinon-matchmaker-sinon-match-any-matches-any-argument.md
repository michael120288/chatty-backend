# The Sinon Matchmaker — sinon.match.any matches any argument

**Level:** 489
**ID:** `cy-489`
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
  it('sinon.match.any matches any argument', () => {
      cy.visit('/pages/level-08/');
      cy.window().then((win) => {
        const stub = cy.stub(win, 'log');
        win.log('anything');
        win.log(42);
        win.log(null);
        cy.wrap(stub).should('have.callCount', 3);
        cy.wrap(stub).getCalls().forEach((call) => {
          expect(call.args[0]).to.satisfy((arg) => arg !== undefined || arg === null || true);
        });
      });
    });
});
```

## Starter Code

```javascript
describe('The Sinon Matchmaker', () => {
  it('sinon.match.any matches any argument', () => {
    cy.visit('/pages/level-08/');
    // Hint: use cy.window()
    // Hint: stub the method
    // Hint: use cy.wrap()
    // Hint: use cy.wrap()
  });
});
```
