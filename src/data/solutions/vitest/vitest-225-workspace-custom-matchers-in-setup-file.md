# Workspace: custom matchers in setup file

**Level:** 225
**ID:** `vitest-225`
**XP:** 210
**Tags:** `configuration`, `setup`

## Objective

Complete the starter code using Workspace: custom matchers in setup file so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: custom matchers in setup file to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { test, expect } from 'vitest';

expect.extend({
  toBeValidUrl(received: string) {
    let valid = false;
    try { new URL(received); valid = true; } catch {}
    return {
      pass: valid,
      message: () => \`Expected '\${received}' to be a valid URL\`,
    };
  },
  toBeValidEmail(received: string) {
    const pass = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(received);
    return {
      pass,
      message: () => \`Expected '\${received}' to be a valid email\`,
    };
  },
});

test('custom URL matcher', () => {
  expect('https://example.com').toBeValidUrl();
  expect('http://localhost:3000').toBeValidUrl();
  expect('not-a-url').not.toBeValidUrl();
});

test('custom email matcher', () => {
  expect('user@example.com').toBeValidEmail();
  expect('invalid-email').not.toBeValidEmail();
});
```

## Explanation

`Workspace` Simulate a setup file that registers custom matchers globally.

## Starter Code

```javascript
import { test, expect } from 'vitest';

// Simulates what you'd put in setupFiles
expect.extend({
  toBeValidUrl(received: string) {
    let valid = false;
    try { new URL(received); valid = true; } catch {}
    return {
      pass: valid,
      message: () => \`Expected '\${received}' to be a valid URL\`,
    };
  },
  toBeValidEmail(received: string) {
    const pass = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(received);
    return {
      pass,
      message: () => \`Expected '\${received}' to be a valid email\`,
    };
  },
});

test('custom URL matcher', () => {
  // TODO: add assertion using Workspace: custom matchers in setup file
  // TODO: add assertion using Workspace: custom matchers in setup file
  // TODO: add assertion using Workspace: custom matchers in setup file
});

test('custom email matcher', () => {
  // TODO: add assertion using Workspace: custom matchers in setup file
  // TODO: add assertion using Workspace: custom matchers in setup file
});
```
