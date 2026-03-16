# The Scroll Reader — asserts on JSON contents

**Level:** 502
**ID:** `cy-502`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.readFile`, `json`, `.its`, `files`


## Objective

Read a JSON file and assert on a nested property.

## Story

JSON files yield parsed objects. The Scroll Reader drills into nested properties using .its().

## Hints
1. cy.readFile() auto-parses JSON files into objects
2. .its('key') accesses a property of the yielded object
3. Chain .should('eq', value) after .its() to assert the value

## Solution

```javascript
describe('The Scroll Reader', () => {
  it('asserts on a property of a JSON file', () => {
    cy.readFile('cypress/fixtures/example.json').its('name').should('be.a', 'string');
  });
});
```

## Starter Code

```javascript
describe('The Scroll Reader', () => {
  it('asserts on a property of a JSON file', () => {
    cy.visit('/pages/level-01/');
    // Hint: chain .its('someKey') after cy.readFile()
  });
});
```
