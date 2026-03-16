# The Property Seeker — have.property with value checks key and value

**Level:** 257
**ID:** `cy-257`
**Difficulty:** medium
**XP:** 100
**Tags:** `assertions`, `chai`, `objects`, `have.property`, `have.keys`


## Objective

Use have.property (with optional value check), have.all.keys, have.any.keys, and deep.include on wrapped objects.

## Story

Deep within an object's structure lie hidden properties. The Property Seeker reveals what keys an object holds and what values they contain.

## Hints
1. have.property(key, value) is shorthand for checking existence AND exact value in one step
2. have.all.keys checks for EXACT match — extra keys cause failure
3. have.any.keys passes if at least one of the listed keys exists

## Solution

```javascript
describe('The Property Seeker', () => {
  it('have.property with value checks key and value', () => {
      const hero = { name: 'Aria', xp: 1500, level: 42 };
      cy.wrap(hero).should('have.property', 'name', 'Aria');
      cy.wrap(hero).should('have.property', 'xp', 1500);
      cy.wrap(hero).should('have.property', 'level', 42);
    });
});
```

## Starter Code

```javascript
describe('The Property Seeker', () => {
  it('have.property with value checks key and value', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
