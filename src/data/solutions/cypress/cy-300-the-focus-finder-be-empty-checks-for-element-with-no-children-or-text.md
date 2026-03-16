# The Focus Finder — be.empty checks for element with no children or text

**Level:** 300
**ID:** `cy-300`
**Difficulty:** easy
**XP:** 100
**Tags:** `assertions`, `chai-jquery`, `focus`, `exist`, `be.empty`, `have.focus`, `dom`


## Objective

Use have.focus, be.empty, and exist on DOM elements.

## Story

Attention is precious. In a form, only one element can hold focus at a time. The Focus Finder also checks for emptiness — containers that hold nothing, and elements that exist at all.

## Hints
1. have.focus checks document.activeElement — use .focus() to programmatically set focus first
2. be.empty means no child nodes AND no text — an empty <div></div> is empty, <div> </div> with whitespace may not be
3. exist checks if the element is present in the DOM, regardless of visibility

## Solution

```javascript
describe('The Focus Finder', () => {
  it('be.empty checks for element with no children or text', () => {
      cy.visit('/pages/level-79/');
      cy.get('#empty-chest').should('be.empty');
      cy.get('#member-list').should('not.be.empty');
    });
});
```

## Starter Code

```javascript
describe('The Focus Finder', () => {
  it('be.empty checks for element with no children or text', () => {
    cy.visit('/pages/level-79/');
    // Hint: use cy.get()
    // Hint: use cy.get()
  });
});
```
