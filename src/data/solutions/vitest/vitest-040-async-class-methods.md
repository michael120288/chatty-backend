# Async Class Methods

**Level:** 40
**ID:** `vitest-040`
**XP:** 100
**Tags:** `async`, `classes`, `methods`

## Objective

Test async methods on a class instance.

## Story

A service class has async methods. Test them one by one.

## Hints
1. const user = await svc.find(5); expect(user.name).toBe('User5');

## Solution

```javascript
import { test, expect } from 'vitest';
class UserService {
  async find(id) { return { id, name: `User${id}` }; }
  async delete(id) { return { success: true, deletedId: id }; }
}
test('find', async () => {
  const svc = new UserService();
  const user = await svc.find(5);
  expect(user.id).toBe(5);
  expect(user.name).toBe('User5');
});
test('delete', async () => {
  const svc = new UserService();
  const r = await svc.delete(5);
  expect(r.success).toBe(true);
});
```

## Explanation

Vitest's `Async Class Methods` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class UserService {
  async find(id) {
    return { id, name: `User${id}` };
  }
  async delete(id) {
    return { success: true, deletedId: id };
  }
}

test('find returns user', async () => {
  const svc = new UserService();
  // TODO: await svc.find(5) and assert id and name
});

test('delete returns success', async () => {
  const svc = new UserService();
  // TODO: await svc.delete(5) and assert success is true
});
```
