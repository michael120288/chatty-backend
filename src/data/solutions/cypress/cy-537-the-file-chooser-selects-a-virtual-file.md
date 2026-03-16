# The File Chooser — selects a virtual file

**Level:** 537
**ID:** `cy-537`
**Difficulty:** medium
**XP:** 200
**Tags:** `.selectFile`, `virtual-file`, `file-upload`, `buffer`


## Objective

Use .selectFile() with a virtual file defined by contents.

## Story

No file needed on disk. The Chooser creates a virtual file in memory using the contents option.

## Hints
1. .selectFile({ contents: 'data', fileName: 'test.txt' }) creates a virtual file
2. contents can be a string, Cypress.Buffer, or Blob
3. Useful when you want to test without fixture files on disk

## Solution

```javascript
describe('The File Chooser', () => {
  it('selects a virtual in-memory file', () => {
    cy.visit('/pages/level-16/');
    cy.get('input[type=file]').selectFile(
      { contents: 'virtual content', fileName: 'test.txt', mimeType: 'text/plain' },
      { force: true }
    );
    cy.get('input[type=file]').should('exist');
  });
});
```

## Starter Code

```javascript
describe('The File Chooser', () => {
  it('selects a virtual in-memory file', () => {
    cy.visit('/pages/level-16/');
    // Hint: pass { contents: 'hello', fileName: 'test.txt' } to .selectFile()
  });
});
```
