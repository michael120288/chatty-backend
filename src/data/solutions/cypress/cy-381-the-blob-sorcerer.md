# The Blob Sorcerer

**Level:** 381
**ID:** `cy-381`
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
  it('Cypress.Blob.base64StringToBlob converts base64 to Blob', () => {
      const base64 = 'SGVsbG8gV29ybGQ=';
      const blob = Cypress.Blob.base64StringToBlob(base64, 'text/plain');
      expect(blob).to.be.instanceof(Blob);
      expect(blob.size).to.be.greaterThan(0);
    });
});
```

## Starter Code

```javascript
describe('The Blob Sorcerer', () => {
  it('Cypress.Blob.base64StringToBlob converts base64 to Blob', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
