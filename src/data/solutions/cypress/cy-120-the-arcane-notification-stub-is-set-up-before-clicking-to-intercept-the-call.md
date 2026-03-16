# The Arcane Notification — stub is set up before clicking to intercept the call

**Level:** 120
**ID:** `cy-120`
**Difficulty:** medium
**XP:** 195
**Tags:** `cy.stub`, `window.alert`, `window.confirm`, `stubs`, `sinon`


## Objective

Use cy.stub() to intercept window.alert and window.confirm before clicking the buttons.

## Story

Spells often trigger windows of warning or confirmation. Without stubs, these native browser dialogs would halt your tests. A master uses cy.stub() to intercept and control them.

## Hints
1. cy.stub(obj, 'method') replaces obj.method with a spy/stub
2. Use .returns(value) to control what the stub returns
3. Alias stubs with .as('name') and retrieve with cy.get('@name') to assert call count

## Solution

```javascript
describe('The Arcane Notification', () => {
  it('stub is set up before clicking to intercept the call', () => {
      cy.visit('/pages/level-67/');
      cy.window().then((win) => {
        cy.stub(win, 'alert').as('alertStub');
        cy.stub(win, 'confirm').returns(true).as('confirmStub');
      });
      cy.get('#alert-btn').click();
      cy.get('@alertStub').should('have.been.calledOnce');
      cy.get('#confirm-btn').click();
      cy.get('@confirmStub').should('have.been.calledOnce');
    });
});
```

## Starter Code

```javascript
describe('The Arcane Notification', () => {
  it('stub is set up before clicking to intercept the call', () => {
    cy.visit('/pages/level-67/');
    // Hint: use cy.window()
    // Hint: stub the method
    // Hint: stub the method
    // Hint: click the element "#alert-btn"
    // Hint: use cy.get()
    // Hint: click the element "#confirm-btn"
    // Hint: use cy.get()
  });
});
```
