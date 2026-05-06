# Workspace: project references pattern

**Level:** 223
**ID:** `vitest-223`
**XP:** 210
**Tags:** `configuration`, `workspaces`

## Objective

Complete the starter code using Workspace: project references pattern so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: project references pattern to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { test, expect } from 'vitest';

const sharedUtils = {
  formatCurrency(amount: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  },
  parseDate(dateStr: string): Date {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) throw new Error(\`Invalid date: \${dateStr}\`);
    return d;
  },
  generateId(prefix = ''): string {
    return (prefix ? prefix + '-' : '') + Date.now().toString(36);
  },
};

test('sharedUtils.formatCurrency', () => {
  expect(sharedUtils.formatCurrency(1234.56)).toBe('$1,234.56');
  expect(sharedUtils.formatCurrency(0)).toBe('$0.00');
});

test('sharedUtils.parseDate', () => {
  const d = sharedUtils.parseDate('2024-01-15');
  expect(d instanceof Date).toBe(true);
  expect(() => sharedUtils.parseDate('not-a-date')).toThrow('Invalid date');
});

test('sharedUtils.generateId', () => {
  const id = sharedUtils.generateId('user');
  expect(id).toMatch(/^user-/);
  const plain = sharedUtils.generateId();
  expect(typeof plain).toBe('string');
  expect(plain.length).toBeGreaterThan(0);
});
```

## Explanation

`Workspace` Test shared utilities used across multiple projects.

## Starter Code

```javascript
import { test, expect } from 'vitest';

// Simulates @shared/utils pattern from a monorepo
const sharedUtils = {
  formatCurrency(amount: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  },
  parseDate(dateStr: string): Date {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) throw new Error(\`Invalid date: \${dateStr}\`);
    return d;
  },
  generateId(prefix = ''): string {
    return (prefix ? prefix + '-' : '') + Date.now().toString(36);
  },
};

test('sharedUtils.formatCurrency', () => {
  // TODO: add assertion using Workspace: project references pattern
  // TODO: add assertion using Workspace: project references pattern
});

test('sharedUtils.parseDate', () => {
  const d = sharedUtils.parseDate('2024-01-15');
  // TODO: add assertion using Workspace: project references pattern
  // TODO: add assertion using Workspace: project references pattern
});

test('sharedUtils.generateId', () => {
  const id = sharedUtils.generateId('user');
  // TODO: add assertion using Workspace: project references pattern
  const plain = sharedUtils.generateId();
  // TODO: add assertion using Workspace: project references pattern
  // TODO: add assertion using Workspace: project references pattern
});
```
