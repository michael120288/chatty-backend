# The Scroll Reader

**Level:** 501
**ID:** `cy-501`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.readFile`, `files`, `fixtures`, `file-paths`


## Objective

Use cy.readFile() to read a file and assert on its contents.

## Story

Ancient knowledge is stored in files. The Scroll Reader uses cy.readFile() to retrieve that knowledge during tests — reading fixtures, configs, and generated outputs.

## Hints
1. cy.readFile('path/to/file') yields the file contents as a string
2. Add encoding as second arg: cy.readFile('file.txt', 'utf8')
3. cy.readFile() retries until the file exists — useful after cy.exec()

## Solution

```javascript
describe('The Scroll Reader', () => {
  it('reads a fixture file with cy.readFile', () => {
    cy.readFile('cypress/fixtures/example.json').should('exist');
  });
});
```

## Starter Code

```javascript
describe('The Scroll Reader', () => {
  it('reads a fixture file with cy.readFile', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.readFile('cypress/fixtures/example.json')
  });
});
```
