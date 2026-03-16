# The File Chooser — selects multiple files

**Level:** 538
**ID:** `cy-538`
**Difficulty:** medium
**XP:** 200
**Tags:** `.selectFile`, `multiple-files`, `file-upload`, `array`


## Objective

Use .selectFile() with an array to select multiple files.

## Story

Multi-file inputs need an array. The Chooser passes multiple files in one call.

## Hints
1. .selectFile([file1, file2]) selects multiple files
2. The input must have the multiple attribute
3. Each item can be a path string or a virtual file object

## Solution

```javascript
describe('The File Chooser', () => {
  it('selects multiple files with .selectFile', () => {
    cy.visit('/pages/level-16/');
    cy.get('input[type=file]').selectFile(
      [
        { contents: 'file1', fileName: 'a.txt', mimeType: 'text/plain' },
        { contents: 'file2', fileName: 'b.txt', mimeType: 'text/plain' }
      ],
      { force: true }
    );
    cy.get('input[type=file]').should('exist');
  });
});
```

## Starter Code

```javascript
describe('The File Chooser', () => {
  it('selects multiple files with .selectFile', () => {
    cy.visit('/pages/level-16/');
    // Hint: pass an array to .selectFile()
  });
});
```
