# The Promise Alchemist — stub can be switched between resolves and rejects

**Level:** 475
**ID:** `cy-475`
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
  it('stub can be switched between resolves and rejects', () => {
      cy.visit('/pages/level-08/');
      cy.window().then(async (win) => {
        const stub = cy.stub(win, 'fetchItems');
        stub.onFirstCall().resolves(['item-1']);
        stub.onSecondCall().rejects(new Error('Second call fails'));
        const first = await win.fetchItems();
        expect(first).to.eql(['item-1']);
        try {
          await win.fetchItems();
        } catch (e) {
          expect(e.message).to.equal('Second call fails');
        }
      });
    });
});
```

## Starter Code

```javascript
describe('The Promise Alchemist', () => {
  it('stub can be switched between resolves and rejects', () => {
    cy.visit('/pages/level-08/');
    // Hint: use cy.window()
    // Hint: stub the method
  });
});
```
