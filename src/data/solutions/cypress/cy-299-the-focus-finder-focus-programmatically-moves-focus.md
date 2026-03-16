# The Focus Finder — .focus() programmatically moves focus

**Level:** 299
**ID:** `cy-299`
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
  it('.focus() programmatically moves focus', () => {
      cy.get('#save-btn').focus();
      cy.get('#save-btn').should('have.focus');
    });
});
```

## Starter Code

```javascript
describe('The Focus Finder', () => {
  it('.focus() programmatically moves focus', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
