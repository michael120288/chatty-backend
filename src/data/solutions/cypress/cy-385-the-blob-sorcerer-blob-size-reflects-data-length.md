# The Blob Sorcerer — Blob size reflects data length

**Level:** 385
**ID:** `cy-385`
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
  it('Blob size reflects data length', () => {
      const data = 'Hello World';
      const blob = new Blob([data], { type: 'text/plain' });
      expect(blob.size).to.equal(data.length);
    });
});
```

## Starter Code

```javascript
describe('The Blob Sorcerer', () => {
  it('Blob size reflects data length', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
