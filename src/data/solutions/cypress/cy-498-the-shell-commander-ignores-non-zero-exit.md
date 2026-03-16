# The Shell Commander — ignores non-zero exit

**Level:** 498
**ID:** `cy-498`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.exec`, `failOnNonZeroExit`, `shell`, `options`


## Objective

Run cy.exec() with failOnNonZeroExit: false to allow non-zero exit codes.

## Story

Some commands intentionally exit with a non-zero code. The Shell Commander uses failOnNonZeroExit to suppress the failure when needed.

## Hints
1. cy.exec(cmd, { failOnNonZeroExit: false }) allows non-zero exits
2. You can still assert on .its('code') to know the actual code
3. Useful when running lint checks that return 1 when issues are found

## Solution

```javascript
describe('The Shell Commander', () => {
  it('allows non-zero exit with failOnNonZeroExit: false', () => {
    cy.exec('exit 1', { failOnNonZeroExit: false }).its('code').should('eq', 1);
  });
});
```

## Starter Code

```javascript
describe('The Shell Commander', () => {
  it('allows non-zero exit with failOnNonZeroExit: false', () => {
    cy.visit('/pages/level-01/');
    // Hint: pass { failOnNonZeroExit: false } as second argument
  });
});
```
