# The Spell Chronicler — calledWithNew checks constructor usage

**Level:** 320
**ID:** `cy-320`
**Difficulty:** medium
**XP:** 175
**Tags:** `assertions`, `sinon-chai`, `calledWith`, `calledBefore`, `calledAfter`, `spies`, `args`


## Objective

Use calledWith, calledBefore, calledAfter, and calledWithNew to inspect spy call details.

## Story

Order matters in magic. The Spell Chronicler records not just whether a spell was cast, but what arguments were passed, whether one spell preceded another, and who the caster was.

## Hints
1. calledWith checks if the spy was EVER called with those args (not necessarily the last call)
2. calledBefore(otherSpy) checks call ORDER — both must have been called at least once
3. calledWithNew checks if the function was called using the 'new' keyword

## Solution

```javascript
describe('The Spell Chronicler', () => {
  it('calledWithNew checks constructor usage', () => {
      cy.window().then((win) => {
        win.MyClass = function MyClass(name) { this.name = name; };
        const classSpy = cy.spy(win, 'MyClass');
        new win.MyClass('Aria');
        cy.wrap(classSpy).should('have.been.calledWithNew');
        cy.wrap(classSpy).should('have.been.calledWith', 'Aria');
      });
    });
});
```

## Starter Code

```javascript
describe('The Spell Chronicler', () => {
  it('calledWithNew checks constructor usage', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
