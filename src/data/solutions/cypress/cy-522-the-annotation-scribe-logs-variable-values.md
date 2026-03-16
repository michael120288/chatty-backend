# The Annotation Scribe — logs variable values

**Level:** 522
**ID:** `cy-522`
**Difficulty:** easy
**XP:** 100
**Tags:** `cy.log`, `debugging`, `template-literals`, `variables`


## Objective

Use cy.log() to output a dynamic value during the test.

## Story

Inspecting values mid-test is powerful. The Scribe logs them with template literals.

## Hints
1. cy.log(`Value: ${someVar}`) logs the current value
2. cy.log() inside .then() gives you access to the subject
3. This is more visible than console.log during test runs

## Solution

```javascript
describe('The Annotation Scribe', () => {
  it('logs a dynamic value with a template literal', () => {
    cy.visit('/pages/level-01/');
    cy.title().then(title => {
      cy.log(`Page title: ${title}`);
      expect(title).to.be.a('string');
    });
  });
});
```

## Starter Code

```javascript
describe('The Annotation Scribe', () => {
  it('logs a dynamic value with a template literal', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.log() inside a .then() to log the yielded value
  });
});
```
