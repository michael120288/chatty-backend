# The Promise Alchemist — stub.rejects makes function return rejected promise

**Level:** 472
**ID:** `cy-472`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.stub`, `resolves`, `rejects`, `async`, `promises`


## Objective

Use cy.stub().resolves() and cy.stub().rejects() to control async function behavior and test both success and failure code paths.

## Story

Most real functions are async. The Promise Alchemist stubs them to resolve or reject on command — letting you test success paths, error paths, and loading states without ever touching a real server.

## Hints
1. stub.resolves(value) makes the stub return a Promise that resolves with value — no real async code runs
2. stub.rejects(error) makes the stub return a rejected Promise — use try/catch or .catch() to handle it
3. stub.onFirstCall().resolves(...) and stub.onSecondCall().rejects(...) let you simulate retry and failure sequences

## Solution

```javascript
describe('The Promise Alchemist', () => {
  it('stub.rejects makes function return rejected promise', () => {
      cy.visit('/pages/level-08/');
      cy.window().then(async (win) => {
        cy.stub(win, 'fetchItems').rejects(new Error('Network error'));
        try {
          await win.fetchItems();
          throw new Error('Should have thrown');
        } catch (e) {
          expect(e.message).to.equal('Network error');
        }
      });
    });
});
```

## Starter Code

```javascript
describe('The Promise Alchemist', () => {
  it('stub.rejects makes function return rejected promise', () => {
    cy.visit('/pages/level-08/');
    // Hint: use cy.window()
    // Hint: stub the method
  });
});
```
