# Global Setup Pattern

**Level:** 102
**ID:** `vitest-102`
**XP:** 100
**Tags:** `setupFiles`, `global-setup`, `configuration`

## Objective

Demonstrate setupFiles pattern by setting a global before tests run.

## Story

Configure global test setup that applies to all files.

## Hints
1. Access global variables via globalThis.
2. In vitest.config.ts, use setupFiles: ['./setup.ts'] to run setup code before all tests.

## Solution

```javascript
import { test, expect, beforeAll } from 'vitest';
beforeAll(() => {
  globalThis.TEST_ENV = 'vitest';
  globalThis.BASE_URL = 'http://localhost:3000';
});
test('TEST_ENV', () => { expect(globalThis.TEST_ENV).toBe('vitest'); });
test('BASE_URL', () => { expect(globalThis.BASE_URL).toMatch(/^http/); });
```

## Explanation

Vitest's `Global Setup Pattern` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, beforeAll } from 'vitest';

// In real projects, this goes in a setupFiles file.
// Here we simulate it inline.

beforeAll(() => {
  globalThis.TEST_ENV = 'vitest';
  globalThis.BASE_URL = 'http://localhost:3000';
});

test('global TEST_ENV is set', () => {
  // TODO: Assert globalThis.TEST_ENV is 'vitest'
});

test('global BASE_URL is set', () => {
  // TODO: Assert globalThis.BASE_URL starts with 'http'
});
```
