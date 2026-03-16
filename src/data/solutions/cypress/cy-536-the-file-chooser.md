# The File Chooser

**Level:** 536
**ID:** `cy-536`
**Difficulty:** medium
**XP:** 200
**Tags:** `.selectFile`, `file-upload`, `input`, `forms`


## Objective

Use .selectFile() to attach a file to an input element.

## Story

The File Chooser wields .selectFile() — the modern Cypress API for simulating file selection in <input type="file"> elements, replacing the old workarounds.

## Hints
1. .selectFile('cypress/fixtures/example.json') attaches a real fixture file
2. .selectFile() targets <input type="file"> elements
3. Cypress resolves the file path relative to the project root

## Solution

```javascript
describe('The File Chooser', () => {
  it('attaches a fixture file using .selectFile', () => {
    cy.visit('/pages/level-16/');
    cy.get('input[type=file]').selectFile('cypress/fixtures/example.json', { force: true });
    cy.get('input[type=file]').should('exist');
  });
});
```

## Starter Code

```javascript
describe('The File Chooser', () => {
  it('attaches a fixture file using .selectFile', () => {
    cy.visit('/pages/level-16/');
    // Hint: use cy.get('input[type=file]').selectFile()
  });
});
```
