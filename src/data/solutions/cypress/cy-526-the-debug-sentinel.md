# The Debug Sentinel

**Level:** 526
**ID:** `cy-526`
**Difficulty:** easy
**XP:** 100
**Tags:** `cy.pause`, `debugging`, `interactive`, `inspection`


## Objective

Understand cy.pause() — place it in a test to pause execution interactively.

## Story

When a test fails unexpectedly, the Debug Sentinel halts execution mid-stream. cy.pause() freezes time so you can inspect the DOM manually.

## Hints
1. cy.pause() stops test execution and shows a Resume button in the runner
2. Only useful in open (interactive) mode — has no effect in headless runs
3. Remove cy.pause() before committing — it will hang CI

## Solution

```javascript
describe('The Debug Sentinel', () => {
  it('uses cy.debug to inspect the subject', () => {
    cy.visit('/pages/level-01/');
    cy.get('body').debug().should('be.visible');
  });
});
```

## Starter Code

```javascript
describe('The Debug Sentinel', () => {
  it('uses cy.debug to inspect the subject', () => {
    cy.visit('/pages/level-01/');
    // Hint: // Note: cy.pause() is for interactive debugging only — skip it here and just assert
  });
});
```
