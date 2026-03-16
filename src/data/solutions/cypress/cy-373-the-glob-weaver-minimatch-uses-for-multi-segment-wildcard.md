# The Glob Weaver — minimatch uses ** for multi-segment wildcard

**Level:** 373
**ID:** `cy-373`
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
  it('minimatch uses ** for multi-segment wildcard', () => {
      expect(Cypress.minimatch('/api/users/123/posts', '/api/**')).to.be.true;
      expect(Cypress.minimatch('/api/items', '/api/**')).to.be.true;
    });
});
```

## Starter Code

```javascript
describe('The Glob Weaver', () => {
  it('minimatch uses ** for multi-segment wildcard', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
