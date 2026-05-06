# Coverage: coverage thresholds concept

**Level:** 189
**ID:** `vitest-189`
**XP:** 190
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: coverage thresholds concept so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: coverage thresholds concept to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: coverage thresholds concept` in your test assertions.
2. Check the Vitest docs for `Coverage: coverage thresholds concept` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

class AuthService {
  constructor(db) { this.db = db; }

  login(username, password) {
    if (!username || !password) return { success: false, error: 'Missing credentials' };
    const user = this.db.findUser(username);
    if (!user) return { success: false, error: 'User not found' };
    if (user.password !== password) return { success: false, error: 'Wrong password' };
    return { success: true, token: 'jwt-' + user.id };
  }
}

test('AuthService login coverage', () => {
  const db = { findUser: (u) => u === 'alice' ? { id: 1, password: 'pass' } : null };
  const auth = new AuthService(db);

  expect(auth.login('', '')).toEqual({ success: false, error: 'Missing credentials' });
  expect(auth.login('unknown', 'x')).toEqual({ success: false, error: 'User not found' });
  expect(auth.login('alice', 'wrong')).toEqual({ success: false, error: 'Wrong password' });
  expect(auth.login('alice', 'pass')).toEqual({ success: true, token: 'jwt-1' });
});
```

## Explanation

`Coverage` Understand how to structure tests for coverage targets.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class AuthService {
  constructor(db) { this.db = db; }

  login(username, password) {
    if (!username || !password) return { success: false, error: 'Missing credentials' };
    const user = this.db.findUser(username);
    if (!user) return { success: false, error: 'User not found' };
    if (user.password !== password) return { success: false, error: 'Wrong password' };
    return { success: true, token: 'jwt-' + user.id };
  }
}

test('AuthService login coverage', () => {
  const db = { findUser: (u) => u === 'alice' ? { id: 1, password: 'pass' } : null };
  const auth = new AuthService(db);

  // TODO: add assertion using Coverage: coverage thresholds concept
  // TODO: add assertion using Coverage: coverage thresholds concept
  // TODO: add assertion using Coverage: coverage thresholds concept
  // TODO: add assertion using Coverage: coverage thresholds concept
});
```
