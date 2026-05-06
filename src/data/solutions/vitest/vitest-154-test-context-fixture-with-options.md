# Test Context: fixture with options

**Level:** 154
**ID:** `vitest-154`
**XP:** 180
**Tags:** `test`, `context`

## Objective

Complete the starter code using Test Context: fixture with options so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: fixture with options to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  user: async ({}, use) => {
    const defaultUser = { id: 1, name: 'Default User', role: 'viewer' };
    await use(defaultUser);
  },
  adminUser: async ({}, use) => {
    const admin = { id: 99, name: 'Admin', role: 'admin' };
    await use(admin);
  },
});

test('regular user has viewer role', ({ user }) => {
  expect(user.role).toBe('viewer');
  expect(user.id).toBeGreaterThan(0);
});

test('admin user has admin role', ({ adminUser }) => {
  expect(adminUser.role).toBe('admin');
  expect(adminUser.name).toBe('Admin');
});
```

## Explanation

`Test Context` Create a fixture that accepts options to customize behavior.

## Starter Code

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  user: async ({}, use) => {
    const defaultUser = { id: 1, name: 'Default User', role: 'viewer' };
    await use(defaultUser);
  },
  adminUser: async ({}, use) => {
    const admin = { id: 99, name: 'Admin', role: 'admin' };
    await use(admin);
  },
});

test('regular user has viewer role', ({ user }) => {
  // TODO: add assertion using Test Context: fixture with options
  // TODO: add assertion using Test Context: fixture with options
});

test('admin user has admin role', ({ adminUser }) => {
  // TODO: add assertion using Test Context: fixture with options
  // TODO: add assertion using Test Context: fixture with options
});
```
