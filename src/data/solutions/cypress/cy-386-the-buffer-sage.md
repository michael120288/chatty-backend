# The Buffer Sage

**Level:** 386
**ID:** `cy-386`
**Difficulty:** medium
**XP:** 150
**Tags:** `buffer`, `Cypress.Buffer`, `base64`, `encoding`, `binary`, `hex`, `utf8`


## Objective

Use Cypress.Buffer.from() to create buffers, convert encodings, and verify binary content in tests.

## Story

Cypress exposes Node's Buffer API as Cypress.Buffer. Buffers work with binary data: encoding strings to base64, decoding binary responses, and preparing file contents for upload assertions.

## Hints
1. Cypress.Buffer is Node's Buffer API — the same as require('buffer').Buffer in Node.js
2. Buffer.from(str, 'utf8') then .toString('base64') is the standard way to base64-encode a string
3. Buffer.from(b64, 'base64').toString('utf8') decodes back — great for verifying API responses

## Solution

```javascript
describe('The Buffer Sage', () => {
  it('Cypress.Buffer.from creates buffer from string', () => {
      const buf = Cypress.Buffer.from('Hello', 'utf8');
      expect(buf).to.be.instanceof(Uint8Array);
    });
});
```

## Starter Code

```javascript
describe('The Buffer Sage', () => {
  it('Cypress.Buffer.from creates buffer from string', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
