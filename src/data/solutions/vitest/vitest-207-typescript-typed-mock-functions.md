# TypeScript: typed mock functions

**Level:** 207
**ID:** `vitest-207`
**XP:** 210
**Tags:** `mocking`, `vi.fn`

## Objective

Complete the starter code using TypeScript: typed mock functions so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: typed mock functions to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect, vi } from 'vitest';

interface Repository<T> {
  findById(id: number): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}

interface User { id: number; name: string; }

test('typed repository mock', async () => {
  const mockRepo: Repository<User> = {
    findById: vi.fn().mockResolvedValue({ id: 1, name: 'Alice' }),
    save: vi.fn().mockImplementation(async (u) => ({ ...u, id: u.id || 99 })),
    delete: vi.fn().mockResolvedValue(undefined),
  };

  const user = await mockRepo.findById(1);
  expect(user).toEqual({ id: 1, name: 'Alice' });
  expect(mockRepo.findById).toHaveBeenCalledWith(1);

  const saved = await mockRepo.save({ id: 0, name: 'Bob' });
  expect(saved.name).toBe('Bob');
});
```

## Explanation

`TypeScript` Create strongly-typed mock functions with vi.fn().

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

interface Repository<T> {
  findById(id: number): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}

interface User { id: number; name: string; }

test('typed repository mock', async () => {
  const mockRepo: Repository<User> = {
    findById: vi.fn().mockResolvedValue({ id: 1, name: 'Alice' }),
    save: vi.fn().mockImplementation(async (u) => ({ ...u, id: u.id || 99 })),
    delete: vi.fn().mockResolvedValue(undefined),
  };

  const user = await mockRepo.findById(1);
  // TODO: add assertion using TypeScript: typed mock functions
  // TODO: add assertion using TypeScript: typed mock functions

  const saved = await mockRepo.save({ id: 0, name: 'Bob' });
  // TODO: add assertion using TypeScript: typed mock functions
});
```
