# Auto-Mocking with vi.mock (no factory)

**Level:** 83
**ID:** `vitest-083`
**XP:** 100
**Tags:** `auto-mock`, `vi.fn`, `module-replacement`

## Objective

Use vi.mock without a factory to auto-mock a module.

## Story

Call vi.mock with just a path — Vitest auto-mocks all exports.

## Hints
1. vi.isMockFunction() returns true for vi.fn().
2. Check toHaveBeenCalledWith for the email, subject, body.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const mockEmailService = {
  send: vi.fn().mockReturnValue(true),
  validate: vi.fn().mockReturnValue(true)
};
test('send is mock', () => {
  mockEmailService.send('user@test.com','Hi','Body');
  expect(mockEmailService.send).toHaveBeenCalledWith('user@test.com','Hi','Body');
  expect(vi.isMockFunction(mockEmailService.send)).toBe(true);
});
```

## Explanation

Vitest's `Auto-Mocking with vi.mock (no factory)` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

// Auto-mock pattern: wrap real functions with vi.fn()
const emailService = {
  send: (to, subject, body) => { /* real email */ return true; },
  validate: (email) => email.includes('@')
};

// Manually auto-mock by replacing methods with vi.fn()
const mockEmailService = {
  send: vi.fn().mockReturnValue(true),
  validate: vi.fn().mockReturnValue(true)
};

test('send is a mock function', () => {
  mockEmailService.send('user@test.com', 'Hi', 'Body');
  // TODO: Assert send was called with correct args
  // TODO: Assert vi.isMockFunction(mockEmailService.send) is true
});
```
