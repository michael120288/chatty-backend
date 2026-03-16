# The File Chooser — drag and drop with selectFile

**Level:** 539
**ID:** `cy-539`
**Difficulty:** medium
**XP:** 200
**Tags:** `.selectFile`, `drag-drop`, `file-upload`, `action`


## Objective

Use .selectFile() with action: 'drag-drop' to simulate dropping a file.

## Story

Some upload zones accept drag-and-drop. The Chooser uses the drag-drop action option to simulate this.

## Hints
1. .selectFile(file, { action: 'drag-drop' }) triggers dragover and drop events
2. The target element must have drag event listeners
3. Useful for upload zones that do not use <input type="file">

## Solution

```javascript
describe('The File Chooser', () => {
  it('simulates file drag-drop with selectFile', () => {
    cy.visit('/pages/level-17/');
    cy.get('body').selectFile(
      { contents: 'drag data', fileName: 'drag.txt', mimeType: 'text/plain' },
      { action: 'drag-drop', force: true }
    );
    cy.get('body').should('be.visible');
  });
});
```

## Starter Code

```javascript
describe('The File Chooser', () => {
  it('simulates file drag-drop with selectFile', () => {
    cy.visit('/pages/level-17/');
    // Hint: pass { action: 'drag-drop' } as the options object
  });
});
```
