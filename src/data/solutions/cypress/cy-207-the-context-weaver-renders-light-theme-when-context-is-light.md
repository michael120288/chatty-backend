# The Context Weaver — renders light theme when context is light

**Level:** 207
**ID:** `cy-207`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.mount`, `React Context`, `createContext`, `useContext`, `component testing`


## Objective

Mount components that consume React Context by wrapping them in the appropriate Provider, and assert the component renders correctly based on different context values.

## Story

React Context is invisible in isolation. The Context Weaver wraps mounted components in their required context providers — feeding theme, locale, user, or any shared value directly into the component without a full app stack.

## Hints
1. Wrap the component in <MyContext.Provider value={...}> inside cy.mount() to inject any context value
2. Mount the same component twice with different context values to test all branches in one describe block
3. For multiple contexts, nest providers: outer context wraps inner context wraps the component

## Solution

```javascript
import React from 'react';
import { ThemeProvider } from '../../context/ThemeContext.jsx';
import { ThemedCard } from '../../components/ThemedCard.jsx';

describe('The Context Weaver', () => {
  it('renders light theme when context is light', () => {
      cy.mount(<ThemeProvider value="light"><ThemedCard title="Sun Kingdom" /></ThemeProvider>);
      cy.get('[data-testid="themed-card"]').should('have.class', 'theme-light');
    });
});
```

## Starter Code

```javascript
describe('The Context Weaver', () => {
  it('renders light theme when context is light', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
