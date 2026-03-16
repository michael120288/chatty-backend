# The Scroll Scribe — writes JSON

**Level:** 507
**ID:** `cy-507`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.writeFile`, `json`, `files`, `serialization`


## Objective

Write a JavaScript object to a file as JSON using cy.writeFile().

## Story

Objects are automatically serialised to JSON. The Scribe stores structured data for later retrieval.

## Hints
1. cy.writeFile(path, { key: value }) writes prettified JSON
2. cy.readFile() will auto-parse it back to an object
3. Useful for storing test-generated IDs for later tests

## Solution

```javascript
describe('The Scroll Scribe', () => {
  it('writes a JSON object to a file', () => {
    cy.writeFile('/tmp/cy-data.json', { hero: 'wizard', level: 5 });
    cy.readFile('/tmp/cy-data.json').its('hero').should('eq', 'wizard');
  });
});
```

## Starter Code

```javascript
describe('The Scroll Scribe', () => {
  it('writes a JSON object to a file', () => {
    cy.visit('/pages/level-01/');
    // Hint: pass a plain object as second arg to cy.writeFile()
  });
});
```
