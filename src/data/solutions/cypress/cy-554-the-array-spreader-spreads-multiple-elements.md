# The Array Spreader — spreads multiple elements

**Level:** 554
**ID:** `cy-554`
**Difficulty:** medium
**XP:** 200
**Tags:** `.spread`, `.then`, `multiple-elements`, `dom`


## Objective

Use .spread() on a multi-element result to access individual elements.

## Story

After getting multiple elements, the Spreader accesses each by position in the callback.

## Hints
1. cy.get('li').then($els => [...$els]).spread((el1, el2) => { }) spreads DOM elements
2. Convert jQuery collection to array first with [...$els]
3. Useful for comparing two specific elements side by side

## Solution

```javascript
describe('The Array Spreader', () => {
  it('spreads DOM elements from a multi-element result', () => {
    cy.visit('/pages/level-01/');
    cy.get('body, html').then($els => [...$els]).spread((body, html) => {
      expect(body.tagName.toLowerCase()).to.eq('body');
      expect(html.tagName.toLowerCase()).to.eq('html');
    });
  });
});
```

## Starter Code

```javascript
describe('The Array Spreader', () => {
  it('spreads DOM elements from a multi-element result', () => {
    cy.visit('/pages/level-01/');
    // Hint: convert the jQuery result to an array then use .spread()
  });
});
```
