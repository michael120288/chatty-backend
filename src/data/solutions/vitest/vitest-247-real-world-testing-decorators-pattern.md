# Real-World: testing decorators pattern

**Level:** 247
**ID:** `vitest-247`
**XP:** 290
**Tags:** `integration`, `patterns`

## Objective

Complete the starter code using Real-World: testing decorators pattern so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing decorators pattern to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

interface UserService { getUser(id: number): Promise<{ id: number; name: string }>; }

function withLogging(service: UserService, logger: { log: (m: string) => void }): UserService {
  return {
    async getUser(id: number) {
      logger.log(\`Fetching user \${id}\`);
      const result = await service.getUser(id);
      logger.log(\`Fetched user \${result.name}\`);
      return result;
    }
  };
}

function withCache(service: UserService): UserService {
  const cache = new Map<number, any>();
  return {
    async getUser(id: number) {
      if (cache.has(id)) return cache.get(id);
      const result = await service.getUser(id);
      cache.set(id, result);
      return result;
    }
  };
}

test('withLogging decorator logs calls', async () => {
  const baseService: UserService = {
    getUser: async (id) => ({ id, name: \`User \${id}\` }),
  };
  const logger = { log: vi.fn() };
  const decorated = withLogging(baseService, logger);

  const user = await decorated.getUser(5);
  expect(user.id).toBe(5);
  expect(logger.log).toHaveBeenCalledTimes(2);
  expect(logger.log).toHaveBeenNthCalledWith(1, 'Fetching user 5');
  expect(logger.log).toHaveBeenNthCalledWith(2, 'Fetched user User 5');
});

test('withCache avoids duplicate calls', async () => {
  const spy = vi.fn().mockResolvedValue({ id: 1, name: 'Alice' });
  const decorated = withCache({ getUser: spy });

  await decorated.getUser(1);
  await decorated.getUser(1);
  await decorated.getUser(2);

  expect(spy).toHaveBeenCalledTimes(2);
});
```

## Explanation

`Real` Test the decorator pattern applied to a service class.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

interface UserService { getUser(id: number): Promise<{ id: number; name: string }>; }

function withLogging(service: UserService, logger: { log: (m: string) => void }): UserService {
  return {
    async getUser(id: number) {
      logger.log(\`Fetching user \${id}\`);
      const result = await service.getUser(id);
      logger.log(\`Fetched user \${result.name}\`);
      return result;
    }
  };
}

function withCache(service: UserService): UserService {
  const cache = new Map<number, any>();
  return {
    async getUser(id: number) {
      if (cache.has(id)) return cache.get(id);
      const result = await service.getUser(id);
      cache.set(id, result);
      return result;
    }
  };
}

test('withLogging decorator logs calls', async () => {
  const baseService: UserService = {
    getUser: async (id) => ({ id, name: \`User \${id}\` }),
  };
  const logger = { log: vi.fn() };
  const decorated = withLogging(baseService, logger);

  const user = await decorated.getUser(5);
  // TODO: add assertion using Real-World: testing decorators pattern
  // TODO: add assertion using Real-World: testing decorators pattern
  // TODO: add assertion using Real-World: testing decorators pattern
  // TODO: add assertion using Real-World: testing decorators pattern
});

test('withCache avoids duplicate calls', async () => {
  const spy = vi.fn().mockResolvedValue({ id: 1, name: 'Alice' });
  const decorated = withCache({ getUser: spy });

  await decorated.getUser(1);
  await decorated.getUser(1);
  await decorated.getUser(2);

  // TODO: add assertion using Real-World: testing decorators pattern
});
```
