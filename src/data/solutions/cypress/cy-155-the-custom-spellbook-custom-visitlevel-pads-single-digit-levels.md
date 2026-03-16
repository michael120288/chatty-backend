# The Custom Spellbook — custom visitLevel pads single-digit levels

**Level:** 155
**ID:** `cy-155`
**Difficulty:** medium
**XP:** 185
**Tags:** `Cypress.Commands.add`, `custom commands`, `prevSubject`, `command chaining`


## Objective

Define a custom command cy.visitLevel() and a child command .shouldHaveText(), then use them to test the enchanted item page.

## Story

Every great guild develops its own rituals. With Cypress.Commands.add(), you can forge custom commands that encapsulate repetitive logic — making your tests more readable and your spellbook uniquely yours.

## Hints
1. Cypress.Commands.add('name', fn) registers a new command available as cy.name()
2. Add { prevSubject: 'element' } to create a child command that operates on a yielded element
3. Custom commands can chain any cy commands inside them — they queue, not execute immediately

## Solution

```javascript
describe('The Custom Spellbook', () => {
  it('custom visitLevel pads single-digit levels', () => {
      cy.visitLevel(1);
      cy.url().should('include', '/pages/level-01/');
    });
});
```

## Starter Code

```javascript
describe('The Custom Spellbook', () => {
  it('custom visitLevel pads single-digit levels', () => {
    cy.visit('/');
    // Hint: use cy.url()
  });
});
```
