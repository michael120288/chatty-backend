# The Annotation Scribe — logs inside each iteration

**Level:** 524
**ID:** `cy-524`
**Difficulty:** easy
**XP:** 100
**Tags:** `cy.log`, `.each`, `iteration`, `debugging`


## Objective

Use cy.log() inside a .each() loop to output the current item.

## Story

When iterating with .each(), the Scribe logs each item to track progress through the loop.

## Hints
1. cy.log() inside .each() logs per iteration
2. Combine with the index parameter to show progress
3. cy.log() yields null — chain cy.wrap() if you need to continue a chain after it

## Solution

```javascript
describe('The Annotation Scribe', () => {
  it('logs each item in a .each() loop', () => {
    cy.visit('/pages/level-01/');
    cy.get('body').each((el, i) => {
      cy.log(`Iterating item ${i}`);
    });
  });
});
```

## Starter Code

```javascript
describe('The Annotation Scribe', () => {
  it('logs each item in a .each() loop', () => {
    cy.visit('/pages/level-01/');
    // Hint: use .each((el, i) => { cy.log(`Item ${i}`) }) 
  });
});
```
