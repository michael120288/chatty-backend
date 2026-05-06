# test.override — override fixture values for a suite

**Level:** 259
**ID:** `vitest-259`
**XP:** 220
**Tags:** `test variants`, `fixtures`

## Objective

Complete the starter code using test.override so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use test.override to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test as base, expect, describe } from 'vitest';

const test = base.extend({
  user: async ({}, use) => {
    await use({ name: 'Default', role: 'viewer', level: 1 });
  },
  config: async ({}, use) => {
    await use({ env: 'development', debug: true });
  },
});

describe('standard user suite', () => {
  test('user has default role', ({ user }) => {
    expect(user.role).toBe('viewer');
    expect(user.name).toBe('Default');
  });
});

describe('admin override suite', () => {
  const adminTest = test.override({ user: { name: 'Admin', role: 'admin', level: 99 } });

  adminTest('user is admin', ({ user }) => {
    expect(user.role).toBe('admin');
    expect(user.level).toBe(99);
  });

  adminTest('admin name is correct', ({ user }) => {
    expect(user.name).toBe('Admin');
  });
});

describe('prod config suite', () => {
  const prodTest = test.override({ config: { env: 'production', debug: false } });

  prodTest('config is production', ({ config }) => {
    expect(config.env).toBe('production');
    expect(config.debug).toBe(false);
  });
});
```

## Explanation

`test.override` Use test.override() to replace fixture values for the current suite and all nested suites.

## Starter Code

```javascript
import { test as base, expect, describe } from 'vitest';

const test = base.extend({
  user: async ({}, use) => {
    await use({ name: 'Default', role: 'viewer', level: 1 });
  },
  config: async ({}, use) => {
    await use({ env: 'development', debug: true });
  },
});

describe('standard user suite', () => {
  test('user has default role', ({ user }) => {
    // TODO: add assertion using test.override
    // TODO: add assertion using test.override
  });
});

describe('admin override suite', () => {
  // Override the user fixture for this entire describe block
  const adminTest = test.override({ user: { name: 'Admin', role: 'admin', level: 99 } });

  adminTest('user is admin', ({ user }) => {
    expect(user.role).toBe('admin');
    expect(user.level).toBe(99);
  });

  adminTest('admin name is correct', ({ user }) => {
    expect(user.name).toBe('Admin');
  });
});

describe('prod config suite', () => {
  const prodTest = test.override({ config: { env: 'production', debug: false } });

  prodTest('config is production', ({ config }) => {
    expect(config.env).toBe('production');
    expect(config.debug).toBe(false);
  });
});
```
