# The Argument Shapeshifter — stub falls through to default if withArgs does not match

**Level:** 470
**ID:** `cy-470`
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
  it('stub falls through to default if withArgs does not match', () => {
      cy.visit('/pages/level-08/');
      cy.window().then((win) => {
        const stub = cy.stub(win, 'castSpell').returns('default');
        stub.withArgs('Fireball').returns('fire');
        expect(win.castSpell('IceShard')).to.equal('default');
        expect(win.castSpell('Fireball')).to.equal('fire');
      });
    });
});
```

## Starter Code

```javascript
describe('The Argument Shapeshifter', () => {
  it('stub falls through to default if withArgs does not match', () => {
    cy.visit('/pages/level-08/');
    // Hint: use cy.window()
    // Hint: stub the method
  });
});
```
