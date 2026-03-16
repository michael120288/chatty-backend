# The jQuery Traverser — .parent() navigates up one level

**Level:** 369
**ID:** `cy-369`
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
  it('.parent() navigates up one level', () => {
      cy.get('.member').first().parent().should('exist');
      cy.get('.member').first().parent().should('have.id', 'member-list');
    });
});
```

## Starter Code

```javascript
describe('The jQuery Traverser', () => {
  it('.parent() navigates up one level', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
