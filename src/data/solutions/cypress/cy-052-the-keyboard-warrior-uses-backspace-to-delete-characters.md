# The Keyboard Warrior — uses {backspace} to delete characters

**Level:** 52
**ID:** `cy-052`
**Difficulty:** medium
**XP:** 325
**Tags:** `cy.type`, `special keys`, `{enter}`, `keyboard`, `keystrokes`


## Objective

Type 'CYPRESS' into the enchanted input and press Enter using Cypress special key syntax. Assert '#inscription-result' contains 'Inscribed!'.

## Story

In the Chamber of Inscriptions, words have power. Cypress's cy.type() supports special key sequences like {enter} and {tab}. Type with precision and commit with a keystroke.

## Hints
1. cy.type() supports special keys using curly-brace syntax: {enter}, {tab}, {backspace}.
2. Type the word and press Enter in one call: cy.get('#enchanted-input').type('CYPRESS{enter}').
3. Assert the result: cy.get('#inscription-result').should('contain', 'Inscribed!').

## Solution

```javascript
describe('The Keyboard Warrior', () => {
  it('uses {backspace} to delete characters', () => {
      cy.visit('/pages/level-11/');
      cy.get('#enchanted-input').type('CYPRESX{backspace}S{enter}');
      cy.get('#inscription-result').should('contain', 'Inscribed!');
    });
});
```

## Starter Code

```javascript
describe('The Keyboard Warrior', () => {
  it('uses {backspace} to delete characters', () => {
    cy.visit('/pages/level-11/');
    // Hint: type "CYPRESX{backspace}S{enter}" into "#enchanted-input"
    // Hint: use cy.get()
  });
});
```
