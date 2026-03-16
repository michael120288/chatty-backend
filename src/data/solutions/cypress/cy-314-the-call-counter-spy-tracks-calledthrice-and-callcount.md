# The Call Counter — spy tracks calledThrice and callCount

**Level:** 314
**ID:** `cy-314`
**Difficulty:** medium
**XP:** 150
**Tags:** `assertions`, `sinon-chai`, `spies`, `stubs`, `calledOnce`, `callCount`, `cy.spy`


## Objective

Use cy.spy() and cy.stub(), then assert call counts with calledOnce, calledTwice, calledThrice, and have.callCount.

## Story

Did the spell fire once or twice? The Call Counter attaches invisible trackers to window functions, then counts exactly how many times they were invoked.

## Hints
1. cy.spy() wraps and tracks but still calls the original function; cy.stub() replaces it entirely
2. calledOnce, calledTwice, calledThrice are sugar — have.callCount(N) works for any number
3. Wrap the spy/stub with cy.wrap() to use Cypress retry-ability: cy.wrap(spy).should(...)

## Solution

```javascript
describe('The Call Counter', () => {
  it('spy tracks calledThrice and callCount', () => {
      cy.window().then((win) => {
        const castSpy = cy.spy(win, 'castSpell');
        cy.get('#cast-btn').click();
        cy.get('#cast-btn').click();
        cy.get('#cast-btn').click();
        cy.wrap(castSpy).should('have.been.calledThrice');
        cy.wrap(castSpy).should('have.callCount', 3);
      });
    });
});
```

## Starter Code

```javascript
describe('The Call Counter', () => {
  it('spy tracks calledThrice and callCount', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
