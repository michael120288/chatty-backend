# TypeScript: typed test functions

**Level:** 201
**ID:** `vitest-201`
**XP:** 170
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: typed test functions so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: typed test functions to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

function createUser(data: Partial<User> & Pick<User, 'id' | 'name' | 'email'>): User {
  return { ...data };
}

test('createUser with TypeScript types', () => {
  const user = createUser({ id: 1, name: 'Alice', email: 'alice@test.com' });
  expect(user.id).toBe(1);
  expect(user.name).toBe('Alice');
  expect(user.email).toBe('alice@test.com');
  expect(user.age).toBeUndefined();
});
```

## Explanation

`TypeScript` Write Vitest tests with TypeScript types.

## Starter Code

```javascript
import { test, expect } from 'vitest';

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

function createUser(data: Partial<User> & Pick<User, 'id' | 'name' | 'email'>): User {
  return { ...data };
}

test('createUser with TypeScript types', () => {
  const user = createUser({ id: 1, name: 'Alice', email: 'alice@test.com' });
  // TODO: add assertion using TypeScript: typed test functions
  // TODO: add assertion using TypeScript: typed test functions
  // TODO: add assertion using TypeScript: typed test functions
  // TODO: add assertion using TypeScript: typed test functions
});
```
