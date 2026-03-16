# The Shell Commander — reads stderr output

**Level:** 499
**ID:** `cy-499`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.exec`, `stderr`, `shell`


## Objective

Run cy.exec() and inspect the stderr output.

## Story

Error output flows through stderr. The Shell Commander reads it just as easily as stdout.

## Hints
1. cy.exec() yields { code, stdout, stderr }
2. .its('stderr') accesses error output
3. Both stdout and stderr are strings — use .should('contain', ...)

## Solution

```javascript
describe('The Shell Commander', () => {
  it('reads stderr from cy.exec', () => {
    cy.exec('echo error >&2', { failOnNonZeroExit: false }).its('stderr').should('be.a', 'string');
  });
});
```

## Starter Code

```javascript
describe('The Shell Commander', () => {
  it('reads stderr from cy.exec', () => {
    cy.visit('/pages/level-01/');
    // Hint: access .its('stderr') on the cy.exec() result
  });
});
```
