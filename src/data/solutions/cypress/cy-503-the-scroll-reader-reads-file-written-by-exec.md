# The Scroll Reader — reads file written by exec

**Level:** 503
**ID:** `cy-503`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.readFile`, `cy.exec`, `files`, `workflow`


## Objective

Write a file with cy.exec() then read it back with cy.readFile().

## Story

First the Shell Commander writes a file, then the Scroll Reader reads it. A classic pattern for passing data between cy.exec() and cy.readFile().

## Hints
1. cy.exec('echo "hello" > /tmp/test.txt') writes a file
2. cy.readFile('/tmp/test.txt') reads it back
3. cy.readFile() retries automatically — no need for cy.wait()

## Solution

```javascript
describe('The Scroll Reader', () => {
  it('reads a file written by cy.exec', () => {
    cy.exec('echo "level_passed" > /tmp/cy-test.txt');
    cy.readFile('/tmp/cy-test.txt').should('contain', 'level_passed');
  });
});
```

## Starter Code

```javascript
describe('The Scroll Reader', () => {
  it('reads a file written by cy.exec', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.exec() to write, then cy.readFile() to read
  });
});
```
