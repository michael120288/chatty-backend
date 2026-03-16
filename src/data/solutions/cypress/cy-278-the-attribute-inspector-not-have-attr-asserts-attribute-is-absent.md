# The Attribute Inspector — not.have.attr asserts attribute is absent

**Level:** 278
**ID:** `cy-278`
**Difficulty:** easy
**XP:** 100
**Tags:** `assertions`, `chai-jquery`, `dom`, `have.attr`, `have.prop`, `have.id`, `have.data`


## Objective

Use have.attr, have.prop, have.id, and have.data on DOM elements to verify their attributes.

## Story

Every element carries hidden markings — attributes, properties, IDs, and data values. The Attribute Inspector reads what the naked eye cannot see.

## Hints
1. have.attr reads the HTML attribute string; have.data reads data-* and auto-converts types (numbers stay numbers)
2. have.prop reads the live DOM property — tagName, checked, disabled, width, etc.
3. Attribute values are always strings; data-* values are type-converted by jQuery

## Solution

```javascript
describe('The Attribute Inspector', () => {
  it('not.have.attr asserts attribute is absent', () => {
      cy.get('#hero').should('not.have.attr', 'hidden');
      cy.get('#hero').should('not.have.attr', 'disabled');
    });
});
```

## Starter Code

```javascript
describe('The Attribute Inspector', () => {
  it('not.have.attr asserts attribute is absent', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
