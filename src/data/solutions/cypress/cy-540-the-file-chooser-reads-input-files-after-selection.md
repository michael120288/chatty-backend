# The File Chooser — reads input files after selection

**Level:** 540
**ID:** `cy-540`
**Difficulty:** medium
**XP:** 200
**Tags:** `.selectFile`, `file-upload`, `.its`, `assertions`


## Objective

Assert on the files property of an input after .selectFile().

## Story

After selecting, the Chooser verifies the file was received by reading the input's files property.

## Hints
1. After .selectFile(), use .then(input => input[0].files) to access the FileList
2. .its('files.length') asserts how many files are attached
3. The files property is a native FileList object

## Solution

```javascript
describe('The File Chooser', () => {
  it('reads the files property after selection', () => {
    cy.visit('/pages/level-16/');
    cy.get('input[type=file]')
      .selectFile({ contents: 'data', fileName: 'f.txt', mimeType: 'text/plain' }, { force: true })
      .then(($input) => {
        expect($input[0].files.length).to.eq(1);
      });
  });
});
```

## Starter Code

```javascript
describe('The File Chooser', () => {
  it('reads the files property after selection', () => {
    cy.visit('/pages/level-16/');
    // Hint: chain .then($input => $input[0].files.length) after selectFile
  });
});
```
