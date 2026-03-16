# The Visibility Veil — be.hidden for display:none elements

**Level:** 308
**ID:** `cy-308`
**Difficulty:** easy
**XP:** 100
**Tags:** `assertions`, `chai-jquery`, `visibility`, `be.visible`, `be.hidden`, `display`, `dom`


## Objective

Use be.visible and be.hidden to check whether elements are actually rendered on screen.

## Story

Some elements lurk in shadow — hidden by CSS, tucked off-screen, or veiled by invisible parents. The Visibility Veil reveals what is truly seen and what is merely present.

## Hints
1. be.visible checks CSS visibility — an element hidden with display:none, visibility:hidden, or off-screen returns be.hidden
2. An element can exist in DOM but be.hidden — existence and visibility are separate
3. If a parent is hidden, all children are also be.hidden even if they have no hidden styles themselves

## Solution

```javascript
describe('The Visibility Veil', () => {
  it('be.hidden for display:none elements', () => {
      cy.get('#secret-room').should('be.hidden');
      cy.get('#secret-room').should('exist');
    });
});
```

## Starter Code

```javascript
describe('The Visibility Veil', () => {
  it('be.hidden for display:none elements', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
