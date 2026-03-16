# The Ancient Tome — selects bookmark from context menu

**Level:** 108
**ID:** `cy-108`
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
  it('selects bookmark from context menu', () => {
      cy.visit('/pages/level-65/');
      cy.get('#tome-icon').rightclick();
      cy.get('#context-menu').should('be.visible');
      cy.get('#bookmark-spell').click();
      cy.get('#ctx-result').should('contain', 'bookmarked');
    });
});
```

## Starter Code

```javascript
describe('The Ancient Tome', () => {
  it('selects bookmark from context menu', () => {
    cy.visit('/pages/level-65/');
    // Hint: use cy.get()
    // Hint: select "#context-menu" and assert it is visible
    // Hint: click the element "#bookmark-spell"
    // Hint: use cy.get()
  });
});
```
