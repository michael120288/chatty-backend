# The Blob Sorcerer — arrayBufferToBlob creates a Blob from ArrayBuffer

**Level:** 383
**ID:** `cy-383`
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
  it('arrayBufferToBlob creates a Blob from ArrayBuffer', () => {
      const buffer = new Uint8Array([72, 101, 108, 108, 111]).buffer;
      const blob = Cypress.Blob.arrayBufferToBlob(buffer, 'text/plain');
      expect(blob).to.be.instanceof(Blob);
    });
});
```

## Starter Code

```javascript
describe('The Blob Sorcerer', () => {
  it('arrayBufferToBlob creates a Blob from ArrayBuffer', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
