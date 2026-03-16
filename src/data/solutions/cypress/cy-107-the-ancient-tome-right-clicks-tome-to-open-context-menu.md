# The Ancient Tome — right-clicks tome to open context menu

**Level:** 107
**ID:** `cy-107`
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
  it('right-clicks tome to open context menu', () => {
      cy.visit('/pages/level-65/');
      cy.get('#tome-icon').rightclick();
      cy.get('#context-menu').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Ancient Tome', () => {
  it('right-clicks tome to open context menu', () => {
    cy.visit('/pages/level-65/');
    // Hint: use cy.get()
    // Hint: select "#context-menu" and assert it is visible
  });
});
```
