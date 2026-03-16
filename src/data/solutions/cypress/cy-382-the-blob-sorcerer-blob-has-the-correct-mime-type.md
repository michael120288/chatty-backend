# The Blob Sorcerer — Blob has the correct MIME type

**Level:** 382
**ID:** `cy-382`
**Difficulty:** medium
**XP:** 150
**Tags:** `blob`, `Cypress.Blob`, `base64`, `file-upload`, `binary`, `DataTransfer`


## Objective

Use Cypress.Blob to convert between base64 strings and Blob objects, verify blob properties, and attach a file to an input.

## Story

Cypress bundles blob-util as Cypress.Blob. It converts between base64 strings, Blob objects, and ArrayBuffers — essential for file upload testing and binary data handling.

## Hints
1. Cypress.Blob methods return Promises — wrap with cy.wrap() or use .then() inside a cy command
2. 'Hello World' in base64 is 'SGVsbG8gV29ybGQ=' — 11 ASCII characters = 11 bytes
3. To attach a blob as a file: create a File from the blob, add to DataTransfer, assign to input.files

## Solution

```javascript
describe('The Blob Sorcerer', () => {
  it('Blob has the correct MIME type', () => {
      const base64 = 'SGVsbG8=';
      const blob = Cypress.Blob.base64StringToBlob(base64, 'text/plain');
      expect(blob.type).to.equal('text/plain');
    });
});
```

## Starter Code

```javascript
describe('The Blob Sorcerer', () => {
  it('Blob has the correct MIME type', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
