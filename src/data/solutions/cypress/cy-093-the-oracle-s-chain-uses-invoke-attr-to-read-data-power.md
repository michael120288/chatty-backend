# The Oracle's Chain — uses .invoke("attr") to read data-power

**Level:** 93
**ID:** `cy-093`
**Difficulty:** medium
**XP:** 190
**Tags:** `.then`, `.its`, `.invoke`, `cy.wrap`, `chaining`


## Objective

Use .then(), .its(), .invoke(), and cy.wrap() to read and assert on the oracle panel's data attributes and inner text.

## Story

The oracle reveals its power through a chain of commands. Masters of Cypress use .then() to work with yielded values, .its() to access properties, and .invoke() to call methods — weaving them into a seamless chain.

## Hints
1. .invoke('text') yields the text content of an element
2. .invoke('attr', 'name') yields the value of the named attribute
3. .then(callback) gives you the raw jQuery element to work with
4. cy.wrap(value) wraps a plain value back into a Cypress chain

## Solution

```javascript
describe('The Oracle's Chain', () => {
  it('uses .invoke("attr") to read data-power', () => {
      cy.visit('/pages/level-62/');
      cy.get('[data-power]').invoke('attr', 'data-power').should('eq', '9000');
    });
});
```

## Starter Code

```javascript
describe('The Oracle', () => {
  it('uses .invoke(', () => {
    cy.visit('/pages/level-62/');
    // Hint: use cy.get()
  });
});
```
