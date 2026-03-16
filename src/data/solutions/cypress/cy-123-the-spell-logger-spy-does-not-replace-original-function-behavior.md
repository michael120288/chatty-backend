# The Spell Logger — spy does not replace original function behavior

**Level:** 123
**ID:** `cy-123`
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
  it('spy does not replace original function behavior', () => {
      cy.visit('/pages/level-68/');
      cy.window().then((win) => {
        cy.spy(win.spellCaster, 'castFireball').as('fireballSpy');
      });
      cy.get('#btn-fireball').click();
      cy.get('#spell-log').should('contain', 'Fireball');
    });
});
```

## Starter Code

```javascript
describe('The Spell Logger', () => {
  it('spy does not replace original function behavior', () => {
    cy.visit('/pages/level-68/');
    // Hint: use cy.window()
    // Hint: spy on the method
    // Hint: click the element "#btn-fireball"
    // Hint: use cy.get()
  });
});
```
