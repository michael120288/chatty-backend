# The URL Puppeteer — cy.visit with qs option adds query parameters

**Level:** 405
**ID:** `cy-405`
**Difficulty:** easy
**XP:** 125
**Tags:** `conditional-testing`, `URL-params`, `cy.visit`, `deterministic`, `query-string`, `A/B`


## Objective

Use cy.visit() with query parameters to deterministically set page state, eliminating the need for DOM conditionals entirely.

## Story

The safest conditional is no conditional at all — control the state yourself before the test runs. Pass ?campaign=A or ?campaign=B in the URL and the page renders deterministically every time.

## Hints
1. cy.visit('/page?key=value') is the cleanest way to set state — no DOM conditionals needed
2. URLSearchParams is a native browser API that safely encodes query strings
3. This pattern mirrors real-world A/B testing: you control which variant runs by passing a param

## Solution

```javascript
describe('The URL Puppeteer', () => {
  it('cy.visit with qs option adds query parameters', () => {
      cy.visit('/pages/level-82/', { qs: { variant: 'a' } });
      cy.url().should('include', 'variant=a');
    });
});
```

## Starter Code

```javascript
describe('The URL Puppeteer', () => {
  it('cy.visit with qs option adds query parameters', () => {
    cy.visit('/pages/level-82/');
    // Hint: use cy.visit()
    // Hint: use cy.url()
  });
});
```
