# TypeScript: branded types

**Level:** 213
**ID:** `vitest-213`
**XP:** 200
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: branded types so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: branded types to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

type UserId = number & { readonly _brand: 'UserId' };
type ProductId = number & { readonly _brand: 'ProductId' };

function createUserId(n: number): UserId { return n as UserId; }
function createProductId(n: number): ProductId { return n as ProductId; }

function getUser(id: UserId): { id: UserId; name: string } {
  return { id, name: 'User ' + id };
}

test('branded types preserve values', () => {
  const uid = createUserId(42);
  const pid = createProductId(100);
  expect(uid).toBe(42);
  expect(pid).toBe(100);

  const user = getUser(uid);
  expect(user.id).toBe(42);
  expect(user.name).toBe('User 42');
});
```

## Explanation

`TypeScript` Test code using branded/nominal types for type safety.

## Starter Code

```javascript
import { test, expect } from 'vitest';

type UserId = number & { readonly _brand: 'UserId' };
type ProductId = number & { readonly _brand: 'ProductId' };

function createUserId(n: number): UserId { return n as UserId; }
function createProductId(n: number): ProductId { return n as ProductId; }

function getUser(id: UserId): { id: UserId; name: string } {
  return { id, name: 'User ' + id };
}

test('branded types preserve values', () => {
  const uid = createUserId(42);
  const pid = createProductId(100);
  // TODO: add assertion using TypeScript: branded types
  // TODO: add assertion using TypeScript: branded types

  const user = getUser(uid);
  // TODO: add assertion using TypeScript: branded types
  // TODO: add assertion using TypeScript: branded types
});
```
