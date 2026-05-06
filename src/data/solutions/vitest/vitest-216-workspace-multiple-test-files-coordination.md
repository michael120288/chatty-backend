# Workspace: multiple test files coordination

**Level:** 216
**ID:** `vitest-216`
**XP:** 170
**Tags:** `configuration`, `workspaces`

## Objective

Complete the starter code using Workspace: multiple test files coordination so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: multiple test files coordination to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { test, expect } from 'vitest';

const testUtils = {
  createUser: (overrides = {}) => ({
    id: Math.floor(Math.random() * 1000),
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    ...overrides,
  }),
  createAdmin: (overrides = {}) => ({
    id: Math.floor(Math.random() * 1000),
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    ...overrides,
  }),
};

test('testUtils.createUser with defaults', () => {
  const user = testUtils.createUser();
  expect(user.role).toBe('user');
  expect(user.email).toBe('test@example.com');
  expect(user.id).toBeGreaterThan(0);
});

test('testUtils.createAdmin with overrides', () => {
  const admin = testUtils.createAdmin({ id: 1, email: 'custom@admin.com' });
  expect(admin.role).toBe('admin');
  expect(admin.email).toBe('custom@admin.com');
});
```

## Explanation

`Workspace` Understand how multiple test files share utilities.

## Starter Code

```javascript
import { test, expect } from 'vitest';

// Shared test utilities pattern
const testUtils = {
  createUser: (overrides = {}) => ({
    id: Math.floor(Math.random() * 1000),
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    ...overrides,
  }),
  createAdmin: (overrides = {}) => ({
    id: Math.floor(Math.random() * 1000),
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    ...overrides,
  }),
};

test('testUtils.createUser with defaults', () => {
  const user = testUtils.createUser();
  // TODO: add assertion using Workspace: multiple test files coordination
  // TODO: add assertion using Workspace: multiple test files coordination
  // TODO: add assertion using Workspace: multiple test files coordination
});

test('testUtils.createAdmin with overrides', () => {
  const admin = testUtils.createAdmin({ id: 1, email: 'custom@admin.com' });
  // TODO: add assertion using Workspace: multiple test files coordination
  // TODO: add assertion using Workspace: multiple test files coordination
});
```
