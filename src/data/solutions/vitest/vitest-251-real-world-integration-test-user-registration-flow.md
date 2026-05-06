# Real-World: integration test — user registration flow

**Level:** 251
**ID:** `vitest-251`
**XP:** 310
**Tags:** `users`, `integration`

## Objective

Complete the starter code using Real-World: integration test so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: integration test to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

class UserRegistrationService {
  constructor(
    private db: { exists: (email: string) => Promise<boolean>; save: (user: any) => Promise<any> },
    private emailService: { send: (to: string, subject: string) => Promise<void> },
    private hasher: { hash: (password: string) => string }
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    if (!data.email.includes('@')) throw new Error('Invalid email');
    if (data.password.length < 8) throw new Error('Password too short');

    const exists = await this.db.exists(data.email);
    if (exists) throw new Error('Email already registered');

    const user = await this.db.save({
      name: data.name,
      email: data.email,
      passwordHash: this.hasher.hash(data.password),
    });

    await this.emailService.send(data.email, 'Welcome!');
    return user;
  }
}

test('successful registration flow', async () => {
  const db = {
    exists: vi.fn().mockResolvedValue(false),
    save: vi.fn().mockImplementation(async u => ({ ...u, id: 1 })),
  };
  const emailService = { send: vi.fn().mockResolvedValue(undefined) };
  const hasher = { hash: vi.fn().mockReturnValue('hashed-pw') };

  const service = new UserRegistrationService(db, emailService, hasher);
  const user = await service.register({ name: 'Alice', email: 'alice@test.com', password: 'password123' });

  expect(user.id).toBe(1);
  expect(user.email).toBe('alice@test.com');
  expect(user.passwordHash).toBe('hashed-pw');
  expect(emailService.send).toHaveBeenCalledWith('alice@test.com', 'Welcome!');
});

test('rejects duplicate email', async () => {
  const db = { exists: vi.fn().mockResolvedValue(true), save: vi.fn() };
  const emailService = { send: vi.fn() };
  const hasher = { hash: vi.fn() };

  const service = new UserRegistrationService(db, emailService, hasher);
  await expect(service.register({ name: 'Bob', email: 'dup@test.com', password: 'password123' }))
    .rejects.toThrow('Email already registered');
  expect(emailService.send).not.toHaveBeenCalled();
});
```

## Explanation

`Real` Test a complete user registration flow end-to-end.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

class UserRegistrationService {
  constructor(
    private db: { exists: (email: string) => Promise<boolean>; save: (user: any) => Promise<any> },
    private emailService: { send: (to: string, subject: string) => Promise<void> },
    private hasher: { hash: (password: string) => string }
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    if (!data.email.includes('@')) throw new Error('Invalid email');
    if (data.password.length < 8) throw new Error('Password too short');

    const exists = await this.db.exists(data.email);
    if (exists) throw new Error('Email already registered');

    const user = await this.db.save({
      name: data.name,
      email: data.email,
      passwordHash: this.hasher.hash(data.password),
    });

    await this.emailService.send(data.email, 'Welcome!');
    return user;
  }
}

test('successful registration flow', async () => {
  const db = {
    exists: vi.fn().mockResolvedValue(false),
    save: vi.fn().mockImplementation(async u => ({ ...u, id: 1 })),
  };
  const emailService = { send: vi.fn().mockResolvedValue(undefined) };
  const hasher = { hash: vi.fn().mockReturnValue('hashed-pw') };

  const service = new UserRegistrationService(db, emailService, hasher);
  const user = await service.register({ name: 'Alice', email: 'alice@test.com', password: 'password123' });

  // TODO: add assertion using Real-World: integration test
  // TODO: add assertion using Real-World: integration test
  // TODO: add assertion using Real-World: integration test
  // TODO: add assertion using Real-World: integration test
});

test('rejects duplicate email', async () => {
  const db = { exists: vi.fn().mockResolvedValue(true), save: vi.fn() };
  const emailService = { send: vi.fn() };
  const hasher = { hash: vi.fn() };

  const service = new UserRegistrationService(db, emailService, hasher);
  // TODO: add assertion using Real-World: integration test
  // TODO: add assertion using Real-World: integration test
});
```
