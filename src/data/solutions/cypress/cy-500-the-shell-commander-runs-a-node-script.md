# The Shell Commander — runs a Node script

**Level:** 500
**ID:** `cy-500`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.exec`, `node.js`, `shell`, `scripts`


## Objective

Use cy.exec() to run a Node.js script via the command line.

## Story

Node.js scripts can be executed directly. The Shell Commander uses cy.exec() to run a one-liner Node script and validate its output.

## Hints
1. cy.exec('node -e "console.log(42)"') runs inline Node code
2. The output appears in stdout
3. Useful for seeding test data or resetting state

## Solution

```javascript
describe('The Shell Commander', () => {
  it('runs a Node script via cy.exec', () => {
    cy.exec('node -e "console.log(42)"').its('stdout').should('contain', '42');
  });
});
```

## Starter Code

```javascript
describe('The Shell Commander', () => {
  it('runs a Node script via cy.exec', () => {
    cy.visit('/pages/level-01/');
    // Hint: run cy.exec('node -e "console.log(42)"')
  });
});
```
