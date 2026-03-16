# The Property Seeker

**Level:** 256
**ID:** `cy-256`
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
  it('have.property checks key existence', () => {
      const hero = { name: 'Aria', xp: 1500, guild: 'Storm Riders', level: 42 };
      cy.wrap(hero).should('have.property', 'name');
      cy.wrap(hero).should('have.property', 'xp');
      cy.wrap(hero).should('not.have.property', 'class');
    });
});
```

## Starter Code

```javascript
describe('The Property Seeker', () => {
  it('have.property checks key existence', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
