# Spy with mockReturnValue

**Level:** 62
**ID:** `vitest-062`
**XP:** 100
**Tags:** `vi.spyOn`, `mockReturnValue`, `override`

## Objective

Spy on a method and override its return value.

## Story

Intercept a method call and change what it returns.

## Hints
1. Chain .mockReturnValue() directly on vi.spyOn()
2. The original function is not called when using mockReturnValue.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const db = { getUser: (id) => ({ id, name: 'Real User' }) };
test('spy override', () => {
  const spy = vi.spyOn(db, 'getUser').mockReturnValue({ id: 99, name: 'Mocked' });
  const user = db.getUser(1);
  expect(user.name).toBe('Mocked');
  expect(spy).toHaveBeenCalledWith(1);
  spy.mockRestore();
});
```

## Explanation

Vitest's `Spy with mockReturnValue` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

const db = {
  getUser: (id) => ({ id, name: 'Real User' })
};

test('spy overrides return value', () => {
  const spy = vi.spyOn(db, 'getUser').mockReturnValue({ id: 99, name: 'Mocked' });

  const user = db.getUser(1);
  // TODO: Assert user.name is 'Mocked'
  // TODO: Assert spy was called with 1

  spy.mockRestore();
});
```
