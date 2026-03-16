# The Annotation Scribe — logs with multiple args

**Level:** 525
**ID:** `cy-525`
**Difficulty:** easy
**XP:** 100
**Tags:** `cy.log`, `multiple-args`, `debugging`


## Objective

Call cy.log() with multiple arguments.

## Story

cy.log() accepts multiple arguments separated by spaces. The Scribe uses this to log labels alongside values.

## Hints
1. cy.log('label', value) joins both with a space in the log
2. You can pass objects — they are serialized with JSON.stringify
3. Unlike console.log, cy.log appears in the Cypress UI timeline

## Solution

```javascript
describe('The Annotation Scribe', () => {
  it('calls cy.log with multiple arguments', () => {
    const user = { name: 'wizard' };
    cy.log('Current user:', JSON.stringify(user));
    cy.visit('/pages/level-01/');
    cy.get('body').should('be.visible');
  });
});
```

## Starter Code

```javascript
describe('The Annotation Scribe', () => {
  it('calls cy.log with multiple arguments', () => {
    cy.visit('/pages/level-01/');
    // Hint: call cy.log('key:', someValue) with two arguments
  });
});
```
