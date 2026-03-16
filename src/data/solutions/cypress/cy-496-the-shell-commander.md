# The Shell Commander

**Level:** 496
**ID:** `cy-496`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.exec`, `shell`, `node.js`, `system-commands`


## Objective

Use cy.exec() to run a shell command and inspect its output.

## Story

Beyond the browser, the Shell Commander issues orders to the operating system itself. cy.exec() runs shell commands during test execution — seeding databases, clearing caches, running scripts.

## Hints
1. cy.exec('command') runs a shell command and yields { code, stdout, stderr }
2. Assert on the exit code: .its('code').should('eq', 0)
3. cy.exec() runs in the project root by default

## Solution

```javascript
describe('The Shell Commander', () => {
  it('runs a shell command with cy.exec', () => {
    cy.exec('echo hello').its('stdout').should('contain', 'hello');
  });
});
```

## Starter Code

```javascript
describe('The Shell Commander', () => {
  it('runs a shell command with cy.exec', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.exec('echo hello') and check .its('stdout')
  });
});
```
