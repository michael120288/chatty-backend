# The Mana Crystal — sets slider to minimum value

**Level:** 114
**ID:** `cy-114`
**Difficulty:** medium
**XP:** 190
**Tags:** `.trigger`, `mouseover`, `input events`, `range slider`, `DOM events`


## Objective

Use .trigger() to fire mouseover on the crystal and trigger an input event on the mana slider.

## Story

The mana crystal responds to the subtlest touches — a mouseover awakens it, a slider calibrates it. These interactions require .trigger() to fire DOM events that standard commands cannot reach.

## Hints
1. .trigger('eventName') fires any DOM event on the element
2. For range inputs, use .invoke('val', newValue).trigger('input') to update the displayed value
3. .trigger('mouseover') is useful for hover effects that only activate on pointer entry

## Solution

```javascript
describe('The Mana Crystal', () => {
  it('sets slider to minimum value', () => {
      cy.visit('/pages/level-66/');
      cy.get('#mana-slider').invoke('val', 0).trigger('input');
      cy.get('#mana-value').should('have.text', '0');
    });
});
```

## Starter Code

```javascript
describe('The Mana Crystal', () => {
  it('sets slider to minimum value', () => {
    cy.visit('/pages/level-66/');
    // Hint: use cy.get()
    // Hint: select "#mana-value" and assert its text equals "0"
  });
});
```
