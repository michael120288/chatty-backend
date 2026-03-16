# The Waiter — uses increased timeout to handle slow elements

**Level:** 23
**ID:** `cy-023`
**Difficulty:** medium
**XP:** 225
**Tags:** `timeout`, `cy.get`, `be.visible`, `have.attr`, `async waiting`


## Objective

Wait for the treasure chest to appear (it shows after 2 seconds), then assert its data-treasure attribute equals 'golden-key'.

## Story

The Realm of Async is treacherous. Elements appear and disappear like phantoms. Cypress automatically waits for elements to appear — but you must know how to extend that patience.

## Hints
1. Pass { timeout: 5000 } as the second argument to cy.get() to extend the wait time.
2. Chain .should('be.visible') to wait until the element is visible.
3. Then chain .should('have.attr', 'data-treasure', 'golden-key') to verify the attribute value.

## Solution

```javascript
describe('The Waiter', () => {
  it('uses increased timeout to handle slow elements', () => {
      cy.visit('/pages/level-05/');
      cy.get('#treasure-chest', { timeout: 6000 }).should('have.attr', 'data-treasure', 'golden-key');
    });
});
```

## Starter Code

```javascript
describe('The Waiter', () => {
  it('uses increased timeout to handle slow elements', () => {
    cy.visit('/pages/level-05/');
    // Hint: use cy.get()
  });
});
```
