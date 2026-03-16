# The Glob Weaver — minimatch with { matchBase: true } matches filename anywhere

**Level:** 375
**ID:** `cy-375`
**Difficulty:** medium
**XP:** 100
**Tags:** `minimatch`, `Cypress.minimatch`, `glob`, `patterns`, `file-paths`, `intercept`


## Objective

Use Cypress.minimatch() to test file paths and URL strings against glob patterns.

## Story

Cypress bundles Minimatch for glob pattern matching — the same library used by cy.intercept() and cypress.config.js specPattern. You can use it directly to test if a path matches a glob.

## Hints
1. * matches any character EXCEPT slash (/) — it only works within a single path segment
2. ** matches any number of path segments including slashes
3. Cypress.minimatch returns a boolean — wrap it with cy.wrap() to use Cypress assertions

## Solution

```javascript
describe('The Glob Weaver', () => {
  it('minimatch with { matchBase: true } matches filename anywhere', () => {
      expect(Cypress.minimatch('/api/users/profile.json', '*.json', { matchBase: true })).to.be.true;
    });
});
```

## Starter Code

```javascript
describe('The Glob Weaver', () => {
  it('minimatch with { matchBase: true } matches filename anywhere', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
