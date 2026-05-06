# Workspace: configuring include/exclude

**Level:** 224
**ID:** `vitest-224`
**XP:** 200
**Tags:** `configuration`, `workspaces`

## Objective

Complete the starter code using Workspace: configuring include/exclude so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: configuring include/exclude to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { test, expect, describe } from 'vitest';

describe('unit tests', () => {
  test('pure function test', () => {
    const add = (a: number, b: number) => a + b;
    expect(add(2, 3)).toBe(5);
  });
});

describe('integration tests', () => {
  test('service layer test', async () => {
    const service = {
      getItems: async () => [{ id: 1 }, { id: 2 }],
    };
    const items = await service.getItems();
    expect(items).toHaveLength(2);
    expect(items[0].id).toBe(1);
  });
});

describe('e2e tests', () => {
  test('full flow test', async () => {
    const flow = async (input: string) => {
      const processed = input.trim().toLowerCase();
      const result = await Promise.resolve({ input: processed, ok: true });
      return result;
    };
    const result = await flow('  HELLO  ');
    expect(result.ok).toBe(true);
    expect(result.input).toBe('hello');
  });
});
```

## Explanation

`Workspace` Understand test file patterns by writing well-organized tests.

## Starter Code

```javascript
import { test, expect, describe } from 'vitest';

// Demonstrates *.spec.ts and *.test.ts patterns
describe('unit tests (*.unit.test.ts pattern)', () => {
  test('pure function test', () => {
    const add = (a: number, b: number) => a + b;
    // TODO: add assertion using Workspace: configuring include/exclude
  });
});

describe('integration tests (*.integration.test.ts pattern)', () => {
  test('service layer test', async () => {
    const service = {
      getItems: async () => [{ id: 1 }, { id: 2 }],
    };
    const items = await service.getItems();
    // TODO: add assertion using Workspace: configuring include/exclude
    // TODO: add assertion using Workspace: configuring include/exclude
  });
});

describe('e2e tests (*.e2e.test.ts pattern)', () => {
  test('full flow test', async () => {
    const flow = async (input: string) => {
      const processed = input.trim().toLowerCase();
      const result = await Promise.resolve({ input: processed, ok: true });
      return result;
    };
    const result = await flow('  HELLO  ');
    // TODO: add assertion using Workspace: configuring include/exclude
    // TODO: add assertion using Workspace: configuring include/exclude
  });
});
```
