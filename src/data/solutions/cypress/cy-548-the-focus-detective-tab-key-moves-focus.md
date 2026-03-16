# The Focus Detective — tab key moves focus

**Level:** 548
**ID:** `cy-548`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.focused`, `keyboard`, `tab`, `focus-management`


## Objective

Press Tab and use cy.focused() to verify focus moved to the next element.

## Story

The Tab key moves focus between interactive elements. The Detective verifies focus moves correctly after pressing Tab.

## Hints
1. cy.focused().type('{tab}') or cy.get(el).type('{tab}') moves focus
2. After tabbing, cy.focused() yields the newly focused element
3. Test accessibility of keyboard navigation this way

## Solution

```javascript
describe('The Focus Detective', () => {
  it('verifies focus moves after pressing Tab', () => {
    cy.visit('/pages/level-03/');
    cy.get('#username').focus().type('{tab}');
    cy.focused().should('have.id', 'password');
  });
});
```

## Starter Code

```javascript
describe('The Focus Detective', () => {
  it('verifies focus moves after pressing Tab', () => {
    cy.visit('/pages/level-03/');
    // Hint: type '{tab}' then call cy.focused() to see where focus landed
  });
});
```
