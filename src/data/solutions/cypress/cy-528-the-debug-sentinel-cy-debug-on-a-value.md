# The Debug Sentinel — cy.debug() on a value

**Level:** 528
**ID:** `cy-528`
**Difficulty:** easy
**XP:** 100
**Tags:** `cy.debug`, `debugging`, `values`


## Objective

Use cy.debug() on a non-DOM value like a string or number.

## Story

The Sentinel inspects plain values, not just DOM elements. .debug() works anywhere in the chain.

## Hints
1. cy.wrap(value).debug() logs the wrapped value
2. .debug() yields the subject unchanged so you can continue asserting
3. Check the browser console (F12) to see the debug output

## Solution

```javascript
describe('The Debug Sentinel', () => {
  it('debugs a wrapped value', () => {
    cy.wrap('hello world').debug().should('include', 'hello');
  });
});
```

## Starter Code

```javascript
describe('The Debug Sentinel', () => {
  it('debugs a wrapped value', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.wrap('hello').debug().should('eq', 'hello')
  });
});
```
