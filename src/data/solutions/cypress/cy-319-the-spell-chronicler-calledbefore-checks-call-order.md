# The Spell Chronicler — calledBefore checks call order

**Level:** 319
**ID:** `cy-319`
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
  it('calledBefore checks call order', () => {
      cy.window().then((win) => {
        const castSpy = cy.spy(win, 'castSpell');
        const saveSpy = cy.spy(win, 'saveProgress');
        cy.get('#cast-btn').click();
        cy.get('#save-btn').click();
        cy.wrap(castSpy).should('have.been.calledBefore', saveSpy);
        cy.wrap(saveSpy).should('have.been.calledAfter', castSpy);
      });
    });
});
```

## Starter Code

```javascript
describe('The Spell Chronicler', () => {
  it('calledBefore checks call order', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
