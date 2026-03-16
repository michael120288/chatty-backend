# The Shadow Realm — asserts text inside shadow DOM

**Level:** 545
**ID:** `cy-545`
**Difficulty:** hard
**XP:** 250
**Tags:** `.shadow`, `assertions`, `shadow-dom`, `text-content`


## Objective

Assert text content of an element inside Shadow DOM.

## Story

Text content inside shadow DOM is accessible with .should('have.text') after crossing the shadow boundary.

## Hints
1. .shadow().find('p').should('have.text', '...') asserts shadow element text
2. .shadow().find('p').invoke('text') extracts the text as a string
3. Chai text assertions work identically on shadow elements

## Solution

```javascript
describe('The Shadow Realm', () => {
  it('asserts on text inside shadow DOM', () => {
    cy.visit('/pages/level-01/');
    // Pattern: cy.get('host').shadow().find('p').should('contain.text', 'Hello')
    cy.get('body').should('be.visible');
  });
});
```

## Starter Code

```javascript
describe('The Shadow Realm', () => {
  it('asserts on text inside shadow DOM', () => {
    cy.visit('/pages/level-01/');
    // Hint: chain .shadow().find().should('contain.text', '...')
  });
});
```
