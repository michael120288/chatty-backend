# The Adventurer's Guild

**Level:** 101
**ID:** `cy-101`
**Difficulty:** easy
**XP:** 175
**Tags:** `.check`, `.uncheck`, `.select`, `forms`, `checkboxes`


## Objective

Fill out the hero enrollment form using .check(), .uncheck(), and .select() to choose a class and set skills.

## Story

Every adventurer must register their skills and class at the guild hall. The enrollment form uses checkboxes and a dropdown — tested by masters using .check(), .uncheck(), and .select().

## Hints
1. .check() checks a checkbox or radio button
2. .uncheck() unchecks a checkbox
3. .select('value') selects an option by its value attribute
4. .should('be.checked') asserts a checkbox is checked

## Solution

```javascript
describe('The Adventurer's Guild', () => {
  it('selects hero class and checks its value', () => {
      cy.visit('/pages/level-64/');
      cy.get('#hero-class').select('mage');
      cy.get('#hero-class').should('have.value', 'mage');
    });
});
```

## Starter Code

```javascript
describe('The Adventurer', () => {
  it('selects hero class and checks its value', () => {
    cy.visit('/pages/level-64/');
    // Hint: select option "mage" from "#hero-class"
    // Hint: select "#hero-class" and assert its value equals "mage"
  });
});
```
