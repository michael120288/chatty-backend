# The Adventurer's Guild — submits enrollment and verifies result

**Level:** 104
**ID:** `cy-104`
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
  it('submits enrollment and verifies result', () => {
      cy.visit('/pages/level-64/');
      cy.get('#hero-class').select('mage');
      cy.get('#skill-combat').check();
      cy.get('#enroll-btn').click();
      cy.get('#enroll-result').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Adventurer', () => {
  it('submits enrollment and verifies result', () => {
    cy.visit('/pages/level-64/');
    // Hint: select option "mage" from "#hero-class"
    // Hint: use cy.get()
    // Hint: click the element "#enroll-btn"
    // Hint: select "#enroll-result" and assert it is visible
  });
});
```
