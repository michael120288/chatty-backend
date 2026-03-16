# The Spell Logger — can spy on multiple methods simultaneously

**Level:** 125
**ID:** `cy-125`
**Difficulty:** medium
**XP:** 195
**Tags:** `cy.spy`, `spies`, `sinon`, `function calls`, `observe`


## Objective

Use cy.spy() to observe calls on window.spellCaster and verify the correct methods were called.

## Story

A spy watches without interfering — the perfect tool for verifying that spells were cast without changing their behavior. cy.spy() wraps a function and records every call, letting you assert after the fact.

## Hints
1. cy.spy(obj, 'method') wraps the method without replacing it — the original still runs
2. Unlike cy.stub(), spies do not change behavior; they only observe
3. Alias the spy with .as('name') to assert on it later with cy.get('@name')

## Solution

```javascript
describe('The Spell Logger', () => {
  it('can spy on multiple methods simultaneously', () => {
      cy.visit('/pages/level-68/');
      cy.window().then((win) => {
        cy.spy(win.spellCaster, 'castFireball').as('fireballSpy');
        cy.spy(win.spellCaster, 'castHeal').as('healSpy');
      });
      cy.get('#btn-fireball').click();
      cy.get('#btn-heal').click();
      cy.get('@fireballSpy').should('have.been.calledOnce');
      cy.get('@healSpy').should('have.been.calledOnce');
    });
});
```

## Starter Code

```javascript
describe('The Spell Logger', () => {
  it('can spy on multiple methods simultaneously', () => {
    cy.visit('/pages/level-68/');
    // Hint: use cy.window()
    // Hint: spy on the method
    // Hint: spy on the method
    // Hint: click the element "#btn-fireball"
    // Hint: click the element "#btn-heal"
    // Hint: use cy.get()
    // Hint: use cy.get()
  });
});
```
