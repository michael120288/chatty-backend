# The jQuery Traverser — .siblings() gets all sibling elements

**Level:** 370
**ID:** `cy-370`
**Difficulty:** medium
**XP:** 125
**Tags:** `jquery`, `Cypress.$`, `traversal`, `find`, `parent`, `closest`, `filter`, `siblings`


## Objective

Use Cypress.$() with DOM traversal methods: find(), parent(), children(), closest(), siblings(), and filter().

## Story

A jQuery object can move through the DOM — climbing to parents, descending to children, and scanning siblings. The jQuery Traverser navigates the tree with find(), parent(), children(), closest(), and filter().

## Hints
1. .find() searches ALL descendants; .children() only returns direct children
2. .closest() climbs UP the DOM tree; .find() goes DOWN
3. .filter() narrows an existing set; .find() searches within a set

## Solution

```javascript
describe('The jQuery Traverser', () => {
  it('.siblings() gets all sibling elements', () => {
      cy.get('.member').first().siblings().should('have.length.at.least', 1);
    });
});
```

## Starter Code

```javascript
describe('The jQuery Traverser', () => {
  it('.siblings() gets all sibling elements', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
