# The Annotation Scribe — groups log messages

**Level:** 523
**ID:** `cy-523`
**Difficulty:** easy
**XP:** 100
**Tags:** `cy.log`, `test-structure`, `readability`, `multi-step`


## Objective

Use cy.log() as section headers to structure a multi-step test.

## Story

Complex tests benefit from section markers. The Scribe uses cy.log() to separate phases: setup, action, assertion.

## Hints
1. Use cy.log() before each phase: setup, act, assert
2. It creates a readable narrative in the Cypress time-travel log
3. No performance cost — cy.log() is synchronous and instant

## Solution

```javascript
describe('The Annotation Scribe', () => {
  it('uses cy.log to section a multi-step test', () => {
    cy.log('--- SETUP ---');
    cy.visit('/pages/level-01/');
    cy.log('--- ACTION ---');
    cy.get('body').should('be.visible');
    cy.log('--- ASSERT ---');
    cy.url().should('include', 'level-01');
  });
});
```

## Starter Code

```javascript
describe('The Annotation Scribe', () => {
  it('uses cy.log to section a multi-step test', () => {
    cy.visit('/pages/level-01/');
    // Hint: add cy.log() before each phase of the test
  });
});
```
