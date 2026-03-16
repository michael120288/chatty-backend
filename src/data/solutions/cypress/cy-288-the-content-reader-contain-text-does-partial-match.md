# The Content Reader — contain.text does partial match

**Level:** 288
**ID:** `cy-288`
**Difficulty:** easy
**XP:** 100
**Tags:** `assertions`, `chai-jquery`, `content`, `have.text`, `have.value`, `have.html`


## Objective

Use have.text, have.html, and have.value to verify the content of DOM elements.

## Story

What secrets do elements hold within? The Content Reader extracts HTML markup, visible text, and input values — revealing the true words inscribed in each element.

## Hints
1. have.text does EXACT match of the entire text content — use contain.text for partial matching
2. have.value is for form elements: input, textarea, select
3. have.html checks innerHTML exactly — any inner tags must match precisely

## Solution

```javascript
describe('The Content Reader', () => {
  it('contain.text does partial match', () => {
      cy.get('h1').should('contain.text', 'Workshop');
      cy.get('label[for="hero-name"]').should('contain.text', 'Hero Name');
    });
});
```

## Starter Code

```javascript
describe('The Content Reader', () => {
  it('contain.text does partial match', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
