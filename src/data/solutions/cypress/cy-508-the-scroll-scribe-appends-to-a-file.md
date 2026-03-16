# The Scroll Scribe — appends to a file

**Level:** 508
**ID:** `cy-508`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.writeFile`, `append`, `flag`, `files`


## Objective

Use cy.writeFile() with the flag option to append to an existing file.

## Story

The Scribe can append lines without erasing previous inscriptions. The flag option controls write vs append mode.

## Hints
1. cy.writeFile(path, content, { flag: 'a+' }) appends
2. Default flag is 'w' — overwrites the file
3. Useful for accumulating log output across multiple tests

## Solution

```javascript
describe('The Scroll Scribe', () => {
  it('appends to a file using the flag option', () => {
    cy.writeFile('/tmp/cy-append.txt', 'line1
');
    cy.writeFile('/tmp/cy-append.txt', 'line2
', { flag: 'a+' });
    cy.readFile('/tmp/cy-append.txt').should('contain', 'line1').and('contain', 'line2');
  });
});
```

## Starter Code

```javascript
describe('The Scroll Scribe', () => {
  it('appends to a file using the flag option', () => {
    cy.visit('/pages/level-01/');
    // Hint: pass { flag: 'a+' } as third argument to cy.writeFile()
  });
});
```
