# The Scroll Reader — reads text encoding

**Level:** 505
**ID:** `cy-505`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.readFile`, `encoding`, `utf8`, `base64`, `files`


## Objective

Use cy.readFile() with an explicit encoding like utf8 or base64.

## Story

Binary files and plain text need different encodings. The Scroll Reader specifies the encoding to get the right representation.

## Hints
1. cy.readFile(path, 'utf8') returns a plain string
2. cy.readFile(path, 'base64') returns base64-encoded content
3. Default encoding is utf8 for text files

## Solution

```javascript
describe('The Scroll Reader', () => {
  it('reads a file with explicit utf8 encoding', () => {
    cy.exec('echo "hello" > /tmp/cy-enc.txt');
    cy.readFile('/tmp/cy-enc.txt', 'utf8').should('be.a', 'string');
  });
});
```

## Starter Code

```javascript
describe('The Scroll Reader', () => {
  it('reads a file with explicit utf8 encoding', () => {
    cy.visit('/pages/level-01/');
    // Hint: pass 'utf8' as the second argument to cy.readFile()
  });
});
```
