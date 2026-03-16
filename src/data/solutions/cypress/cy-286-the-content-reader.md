# The Content Reader

**Level:** 286
**ID:** `cy-286`
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
  it('/pages/level-78/');
});
```

## Starter Code

```javascript
describe('The Content Reader', () => {
  it('/pages/level-78/', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
