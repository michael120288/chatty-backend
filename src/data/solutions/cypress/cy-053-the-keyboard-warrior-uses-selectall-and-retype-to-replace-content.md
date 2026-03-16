# The Keyboard Warrior — uses {selectall} and retype to replace content

**Level:** 53
**ID:** `cy-053`
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
  it('uses {selectall} and retype to replace content', () => {
      cy.visit('/pages/level-11/');
      cy.get('#enchanted-input').type('WRONG');
      cy.get('#enchanted-input').type('{selectall}CYPRESS{enter}');
      cy.get('#inscription-result').should('contain', 'Inscribed!');
    });
});
```

## Starter Code

```javascript
describe('The Keyboard Warrior', () => {
  it('uses {selectall} and retype to replace content', () => {
    cy.visit('/pages/level-11/');
    // Hint: type "WRONG" into "#enchanted-input"
    // Hint: type "{selectall}CYPRESS{enter}" into "#enchanted-input"
    // Hint: use cy.get()
  });
});
```
