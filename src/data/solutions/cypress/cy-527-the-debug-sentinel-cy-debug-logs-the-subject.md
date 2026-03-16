# The Debug Sentinel — cy.debug() logs the subject

**Level:** 527
**ID:** `cy-527`
**Difficulty:** easy
**XP:** 100
**Tags:** `cy.debug`, `.debug`, `debugging`, `subject`


## Objective

Chain .debug() on a command to log its subject to the console.

## Story

.debug() prints the current subject to the browser console. The Sentinel uses it to inspect what a command yields before asserting.

## Hints
1. .debug() logs the current subject to the console and yields it unchanged
2. It is a pass-through — chaining after it works normally
3. Unlike cy.pause(), .debug() does not halt execution

## Solution

```javascript
describe('The Debug Sentinel', () => {
  it('chains .debug() without breaking the command chain', () => {
    cy.visit('/pages/level-01/');
    cy.get('h1').debug().should('be.visible');
  });
});
```

## Starter Code

```javascript
describe('The Debug Sentinel', () => {
  it('chains .debug() without breaking the command chain', () => {
    cy.visit('/pages/level-01/');
    // Hint: chain .debug() between .get() and .should()
  });
});
```
