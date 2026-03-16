# The Adventurer's Guild — checks combat and magic skills

**Level:** 102
**ID:** `cy-102`
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
  it('checks combat and magic skills', () => {
      cy.visit('/pages/level-64/');
      cy.get('#skill-combat').check();
      cy.get('#skill-magic').check();
      cy.get('#skill-combat').should('be.checked');
      cy.get('#skill-magic').should('be.checked');
    });
});
```

## Starter Code

```javascript
describe('The Adventurer', () => {
  it('checks combat and magic skills', () => {
    cy.visit('/pages/level-64/');
    // Hint: use cy.get()
    // Hint: use cy.get()
    // Hint: use cy.get()
    // Hint: use cy.get()
  });
});
```
