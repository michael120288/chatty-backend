# The Debug Sentinel — uses cy.then for manual inspection

**Level:** 529
**ID:** `cy-529`
**Difficulty:** easy
**XP:** 100
**Tags:** `.then`, `debugging`, `console.log`, `inspection`


## Objective

Use .then() as a manual debugging point inside a test.

## Story

When automated debugging is not enough, the Sentinel uses .then() to run arbitrary code — console.log, debugger, or custom logic.

## Hints
1. .then(subject => { console.log(subject) }) lets you inspect anything
2. The debugger statement inside .then() triggers browser devtools
3. .then() is synchronous within the Cypress command queue

## Solution

```javascript
describe('The Debug Sentinel', () => {
  it('uses .then to log the subject manually', () => {
    cy.visit('/pages/level-01/');
    cy.get('body').then(($body) => {
      console.log('body tag:', $body[0].tagName);
      expect($body[0].tagName.toLowerCase()).to.eq('body');
    });
  });
});
```

## Starter Code

```javascript
describe('The Debug Sentinel', () => {
  it('uses .then to log the subject manually', () => {
    cy.visit('/pages/level-01/');
    // Hint: use .then(el => { console.log(el) }) to inspect the element
  });
});
```
