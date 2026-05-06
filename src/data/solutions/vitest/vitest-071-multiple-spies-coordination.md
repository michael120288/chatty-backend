# Multiple Spies Coordination

**Level:** 71
**ID:** `vitest-071`
**XP:** 100
**Tags:** `vi.spyOn`, `multiple-spies`, `interaction`

## Objective

Set up spies on multiple methods and verify their interaction.

## Story

Track calls across multiple methods to verify they interact correctly.

## Hints
1. Use separate spies for each method.
2. Check each spy's toHaveBeenCalledWith.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const authService = { validate: t => t==='valid', log: () => {} };
function authenticate(token) {
  const ok = authService.validate(token);
  authService.log(ok ? 'success' : 'failure');
  return ok;
}
test('logs success', () => {
  const validateSpy = vi.spyOn(authService, 'validate');
  const logSpy = vi.spyOn(authService, 'log');
  const result = authenticate('valid');
  expect(result).toBe(true);
  expect(validateSpy).toHaveBeenCalledWith('valid');
  expect(logSpy).toHaveBeenCalledWith('success');
  vi.restoreAllMocks();
});
```

## Explanation

Vitest's `Multiple Spies Coordination` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

const authService = {
  validate: (token) => token === 'valid',
  log: (msg) => {}
};

function authenticate(token) {
  const ok = authService.validate(token);
  authService.log(ok ? 'success' : 'failure');
  return ok;
}

test('auth logs success for valid token', () => {
  const validateSpy = vi.spyOn(authService, 'validate');
  const logSpy = vi.spyOn(authService, 'log');

  const result = authenticate('valid');

  // TODO: Assert result is true
  // TODO: Assert validateSpy called with 'valid'
  // TODO: Assert logSpy called with 'success'

  vi.restoreAllMocks();
});
```
