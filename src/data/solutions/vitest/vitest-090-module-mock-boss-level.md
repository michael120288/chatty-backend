# Module Mock Boss Level

**Level:** 90
**ID:** `vitest-090`
**XP:** 150
**Tags:** `vi.fn`, `boss`, `service`, `dependencies`

## Objective

Compose multiple mocked dependencies and test a service that uses them all.

## Story

A service depends on logger, config, and database modules. Mock them all.

## Hints
1. Check each mock independently.
2. database.query returns a resolved promise with [{id:1}].

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const logger = { info: vi.fn(), error: vi.fn() };
const config = { get: vi.fn().mockReturnValue('http://db.test') };
const database = { query: vi.fn().mockResolvedValue([{ id: 1 }]) };
async function userService_findAll() {
  const dbUrl = config.get('DB_URL');
  logger.info(`Connecting to ${dbUrl}`);
  const rows = await database.query('SELECT * FROM users');
  return rows;
}
test('orchestrates deps', async () => {
  const users = await userService_findAll();
  expect(users).toEqual([{ id: 1 }]);
  expect(config.get).toHaveBeenCalledWith('DB_URL');
  expect(logger.info).toHaveBeenCalledTimes(1);
  expect(database.query).toHaveBeenCalledWith('SELECT * FROM users');
});
```

## Explanation

Vitest's `Module Mock Boss Level` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

const logger = { info: vi.fn(), error: vi.fn() };
const config = { get: vi.fn().mockReturnValue('http://db.test') };
const database = { query: vi.fn().mockResolvedValue([{ id: 1 }]) };

async function userService_findAll() {
  const dbUrl = config.get('DB_URL');
  logger.info(`Connecting to ${dbUrl}`);
  const rows = await database.query('SELECT * FROM users');
  return rows;
}

test('service orchestrates dependencies', async () => {
  const users = await userService_findAll();

  // TODO: Assert users equals [{ id: 1 }]
  // TODO: Assert config.get was called with 'DB_URL'
  // TODO: Assert logger.info was called once
  // TODO: Assert database.query was called with 'SELECT * FROM users'
});
```
