# Workspace: test reporters understanding

**Level:** 220
**ID:** `vitest-220`
**XP:** 200
**Tags:** `configuration`, `workspaces`

## Objective

Complete the starter code using Workspace: test reporters understanding so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: test reporters understanding to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { describe, test, expect } from 'vitest';

describe('Payment Processing', () => {
  describe('Validation', () => {
    test('rejects negative amounts', () => {
      const validate = (amount: number) => amount > 0;
      expect(validate(-1)).toBe(false);
      expect(validate(0)).toBe(false);
      expect(validate(0.01)).toBe(true);
    });

    test('accepts valid card formats', () => {
      const isValidCard = (n: string) => /^\d{16}$/.test(n.replace(/\s/g, ''));
      expect(isValidCard('4111111111111111')).toBe(true);
      expect(isValidCard('4111 1111 1111 1111')).toBe(true);
      expect(isValidCard('411')).toBe(false);
    });
  });

  describe('Processing', () => {
    test('returns transaction id on success', () => {
      const process = (amount: number) => ({ id: 'tx-' + amount, status: 'ok' });
      const result = process(99.99);
      expect(result.status).toBe('ok');
      expect(result.id).toMatch(/^tx-/);
    });
  });
});
```

## Explanation

`Workspace` Write tests with descriptive output for reporters.

## Starter Code

```javascript
import { describe, test, expect } from 'vitest';

describe('Payment Processing', () => {
  describe('Validation', () => {
    test('rejects negative amounts', () => {
      const validate = (amount: number) => amount > 0;
      // TODO: add assertion using Workspace: test reporters understanding
      // TODO: add assertion using Workspace: test reporters understanding
      // TODO: add assertion using Workspace: test reporters understanding
    });

    test('accepts valid card formats', () => {
      const isValidCard = (n: string) => /^\d{16}$/.test(n.replace(/\s/g, ''));
      // TODO: add assertion using Workspace: test reporters understanding
      // TODO: add assertion using Workspace: test reporters understanding
      // TODO: add assertion using Workspace: test reporters understanding
    });
  });

  describe('Processing', () => {
    test('returns transaction id on success', () => {
      const process = (amount: number) => ({ id: 'tx-' + amount, status: 'ok' });
      const result = process(99.99);
      // TODO: add assertion using Workspace: test reporters understanding
      // TODO: add assertion using Workspace: test reporters understanding
    });
  });
});
```
