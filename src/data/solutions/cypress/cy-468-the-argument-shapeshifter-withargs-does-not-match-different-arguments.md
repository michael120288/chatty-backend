# The Argument Shapeshifter — withArgs does not match different arguments

**Level:** 468
**ID:** `cy-468`
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
  it('withArgs does not match different arguments', () => {
      cy.visit('/pages/level-08/');
      cy.window().then((win) => {
        const stub = cy.stub(win, 'castSpell');
        stub.withArgs('Fireball').returns('Fire!');
        expect(win.castSpell('Ice')).to.be.undefined;
        expect(win.castSpell('Fireball')).to.equal('Fire!');
      });
    });
});
```

## Starter Code

```javascript
describe('The Argument Shapeshifter', () => {
  it('withArgs does not match different arguments', () => {
    cy.visit('/pages/level-08/');
    // Hint: use cy.window()
    // Hint: stub the method
  });
});
```
