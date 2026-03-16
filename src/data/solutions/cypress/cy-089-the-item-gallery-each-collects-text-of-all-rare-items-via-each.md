# The Item Gallery — Each — collects text of all rare items via .each()

**Level:** 89
**ID:** `cy-089`
**Difficulty:** medium
**XP:** 180
**Tags:** `.each`, `cy.wrap`, `iteration`, `collections`


## Objective

Use .each() to iterate over all .item-rare elements and verify each one has the correct class and is visible.

## Story

The gallery displays many rare items. A skilled tester never checks them one by one — they wield .each() to iterate over every item and assert on each in turn.

## Hints
1. .each() iterates over each element in the subject collection
2. Use cy.wrap($el) inside the callback to get a Cypress chainable from the jQuery element
3. You can also read $el.text() or $el.attr() inside the each callback

## Solution

```javascript
describe('The Item Gallery — Each', () => {
  it('collects text of all rare items via .each()', () => {
      cy.visit('/pages/level-06/');
      const names = [];
      cy.get('.item-rare').each(($el) => {
        names.push($el.text().trim());
      }).then(() => {
        expect(names).to.have.length(3);
      });
    });
});
```

## Starter Code

```javascript
describe('The Item Gallery — Each', () => {
  it('collects text of all rare items via .each()', () => {
    cy.visit('/pages/level-06/');
    // Hint: use cy.get()
  });
});
```
