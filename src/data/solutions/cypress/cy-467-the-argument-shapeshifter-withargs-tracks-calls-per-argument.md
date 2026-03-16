# The Argument Shapeshifter — withArgs tracks calls per argument

**Level:** 467
**ID:** `cy-467`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.stub`, `withArgs`, `argument-matching`, `sinon`, `stubs`


## Objective

Use cy.stub().withArgs() to make a stub return different values depending on its arguments, and assert each branch behaves correctly.

## Story

The same function can mean different things depending on what you pass it. The Argument Shapeshifter uses stub.withArgs() to return different values for different inputs — making one stub smart enough to handle every scenario.

## Hints
1. stub.withArgs(value) scopes the behavior — .returns(), .callsFake(), .throws() only apply when that exact argument is passed
2. stub.returns(default) at the end sets the fallback for any call that does not match a withArgs() branch
3. stub.withArgs(x).callCount tracks how many times the stub was called specifically with argument x

## Solution

```javascript
describe('The Argument Shapeshifter', () => {
  it('withArgs tracks calls per argument', () => {
      cy.visit('/pages/level-08/');
      cy.window().then((win) => {
        const stub = cy.stub(win, 'castSpell');
        stub.withArgs('Fireball').as('fireballStub');
        win.castSpell('Fireball');
        win.castSpell('Fireball');
        cy.get('@fireballStub').should('have.been.calledTwice');
      });
    });
});
```

## Starter Code

```javascript
describe('The Argument Shapeshifter', () => {
  it('withArgs tracks calls per argument', () => {
    cy.visit('/pages/level-08/');
    // Hint: use cy.window()
    // Hint: stub the method
    // Hint: use cy.get()
  });
});
```
