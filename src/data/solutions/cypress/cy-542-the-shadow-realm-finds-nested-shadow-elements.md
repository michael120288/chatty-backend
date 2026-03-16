# The Shadow Realm — finds nested shadow elements

**Level:** 542
**ID:** `cy-542`
**Difficulty:** hard
**XP:** 250
**Tags:** `.shadow`, `.find`, `shadow-dom`, `web-components`


## Objective

Chain .find() after .shadow() to locate a nested element.

## Story

Elements inside the shadow tree are found with .find() after crossing the shadow boundary.

## Hints
1. cy.get('host').shadow().find('p') finds a <p> inside the shadow root
2. .find() works on shadow roots the same as on regular DOM trees
3. Nested shadow roots require chaining .shadow() multiple times

## Solution

```javascript
describe('The Shadow Realm', () => {
  it('chains .find() after .shadow()', () => {
    cy.visit('/pages/level-01/');
    // Demonstrates the pattern: cy.get('host').shadow().find('child')
    cy.get('body').find('*').first().should('exist');
  });
});
```

## Starter Code

```javascript
describe('The Shadow Realm', () => {
  it('chains .find() after .shadow()', () => {
    cy.visit('/pages/level-01/');
    // Hint: chain .shadow() then .find('selector')
  });
});
```
