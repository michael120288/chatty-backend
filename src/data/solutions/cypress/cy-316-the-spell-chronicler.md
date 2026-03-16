# The Spell Chronicler

**Level:** 316
**ID:** `cy-316`
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
  it('/pages/level-80/');
});
```

## Starter Code

```javascript
describe('The Spell Chronicler', () => {
  it('/pages/level-80/', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
