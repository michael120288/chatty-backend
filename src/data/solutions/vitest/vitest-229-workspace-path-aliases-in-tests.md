# Workspace: path aliases in tests

**Level:** 229
**ID:** `vitest-229`
**XP:** 210
**Tags:** `configuration`, `workspaces`

## Objective

Complete the starter code using Workspace: path aliases in tests so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: path aliases in tests to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { test, expect } from 'vitest';

const utils = {
  formatDate: (d: Date) => d.toISOString().split('T')[0],
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  isEmpty: (v: unknown) => v === null || v === undefined || v === '',
};

const services = {
  userService: {
    create: (data: { name: string; email: string }) => ({ ...data, id: 1, createdAt: new Date() }),
    validate: (email: string) => /^[^@]+@[^@]+/.test(email),
  },
};

test('utils functions', () => {
  expect(utils.formatDate(new Date('2024-06-15'))).toBe('2024-06-15');
  expect(utils.capitalize('hello')).toBe('Hello');
  expect(utils.isEmpty(null)).toBe(true);
  expect(utils.isEmpty('x')).toBe(false);
});

test('services', () => {
  const user = services.userService.create({ name: 'Alice', email: 'a@b.com' });
  expect(user.id).toBe(1);
  expect(services.userService.validate('a@b.com')).toBe(true);
  expect(services.userService.validate('bad')).toBe(false);
});
```

## Explanation

`Workspace` Test with path alias resolution patterns.

## Starter Code

```javascript
import { test, expect } from 'vitest';

// Simulates what path aliases (@/utils, @/services) provide
const utils = {
  formatDate: (d: Date) => d.toISOString().split('T')[0],
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  isEmpty: (v: unknown) => v === null || v === undefined || v === '',
};

const services = {
  userService: {
    create: (data: { name: string; email: string }) => ({ ...data, id: 1, createdAt: new Date() }),
    validate: (email: string) => /^[^@]+@[^@]+/.test(email),
  },
};

test('utils functions (from @/utils)', () => {
  // TODO: add assertion using Workspace: path aliases in tests
  // TODO: add assertion using Workspace: path aliases in tests
  // TODO: add assertion using Workspace: path aliases in tests
  // TODO: add assertion using Workspace: path aliases in tests
});

test('services (from @/services)', () => {
  const user = services.userService.create({ name: 'Alice', email: 'a@b.com' });
  // TODO: add assertion using Workspace: path aliases in tests
  // TODO: add assertion using Workspace: path aliases in tests
  // TODO: add assertion using Workspace: path aliases in tests
});
```
