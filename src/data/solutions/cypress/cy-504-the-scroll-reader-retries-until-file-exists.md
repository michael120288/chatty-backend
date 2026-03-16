# The Scroll Reader — retries until file exists

**Level:** 504
**ID:** `cy-504`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.readFile`, `retry-ability`, `timeout`, `files`


## Objective

Demonstrate cy.readFile() retry behaviour with a timeout option.

## Story

cy.readFile() retries automatically. The Scroll Reader waits patiently for a file to appear — no cy.wait() needed.

## Hints
1. cy.readFile(path, { timeout: 10000 }) retries for up to 10 seconds
2. Combine with cy.exec() that generates the file asynchronously
3. This avoids fragile cy.wait(N) patterns

## Solution

```javascript
describe('The Scroll Reader', () => {
  it('uses timeout option with cy.readFile', () => {
    cy.exec('echo "data" > /tmp/cy-timeout.txt');
    cy.readFile('/tmp/cy-timeout.txt', { timeout: 5000 }).should('contain', 'data');
  });
});
```

## Starter Code

```javascript
describe('The Scroll Reader', () => {
  it('uses timeout option with cy.readFile', () => {
    cy.visit('/pages/level-01/');
    // Hint: pass { timeout: 5000 } as second argument to cy.readFile()
  });
});
```
