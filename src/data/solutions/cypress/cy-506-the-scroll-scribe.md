# The Scroll Scribe

**Level:** 506
**ID:** `cy-506`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.writeFile`, `files`, `output`


## Objective

Use cy.writeFile() to write data to a file during a test.

## Story

The Scroll Scribe inscribes test results and data into files using cy.writeFile(). Test outputs become readable records for future reference.

## Hints
1. cy.writeFile(path, contents) writes a file
2. Contents can be a string, object (written as JSON), or Buffer
3. cy.writeFile() creates parent directories automatically

## Solution

```javascript
describe('The Scroll Scribe', () => {
  it('writes a string to a file with cy.writeFile', () => {
    cy.writeFile('/tmp/cy-write.txt', 'hello scribe');
    cy.readFile('/tmp/cy-write.txt').should('contain', 'hello scribe');
  });
});
```

## Starter Code

```javascript
describe('The Scroll Scribe', () => {
  it('writes a string to a file with cy.writeFile', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.writeFile('/tmp/output.txt', 'hello')
  });
});
```
