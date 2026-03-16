# The Ancient Tome — double-click result message contains unlock text

**Level:** 110
**ID:** `cy-110`
**Difficulty:** medium
**XP:** 185
**Tags:** `.dblclick`, `.rightclick`, `context menu`, `mouse events`


## Objective

Use .dblclick() to unlock the tome and .rightclick() to open the context menu and select a spell.

## Story

The ancient tome guards its secrets with a double-lock — only a double-click will open it. Its hidden spells are revealed through a right-click context menu. These gestures require .dblclick() and .rightclick().

## Hints
1. .dblclick() fires a double-click event on the element
2. .rightclick() fires a contextmenu event on the element
3. Context menus triggered by .rightclick() are custom HTML elements, not the browser's native menu

## Solution

```javascript
describe('The Ancient Tome', () => {
  it('double-click result message contains unlock text', () => {
      cy.visit('/pages/level-65/');
      cy.get('#dbl-result').should('not.be.visible');
      cy.get('#tome-icon').dblclick();
      cy.get('#dbl-result').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Ancient Tome', () => {
  it('double-click result message contains unlock text', () => {
    cy.visit('/pages/level-65/');
    // Hint: use cy.get()
    // Hint: use cy.get()
    // Hint: select "#dbl-result" and assert it is visible
  });
});
```
