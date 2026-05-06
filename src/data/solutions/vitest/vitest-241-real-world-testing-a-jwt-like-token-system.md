# Real-World: testing a JWT-like token system

**Level:** 241
**ID:** `vitest-241`
**XP:** 290
**Tags:** `integration`, `patterns`

## Objective

Complete the starter code using Real-World: testing a JWT-like token system so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a JWT-like token system to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function createToken(payload: object, secret: string, expiresInMs: number) {
  const header = btoa(JSON.stringify({ alg: 'simple', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + expiresInMs }));
  const sig = btoa(secret + body);
  return \`\${header}.\${body}.\${sig}\`;
}

function verifyToken(token: string, secret: string): { valid: boolean; payload?: any; error?: string } {
  try {
    const [, body, sig] = token.split('.');
    if (sig !== btoa(secret + body)) return { valid: false, error: 'Invalid signature' };
    const payload = JSON.parse(atob(body));
    if (payload.exp < Date.now()) return { valid: false, error: 'Token expired' };
    return { valid: true, payload };
  } catch {
    return { valid: false, error: 'Malformed token' };
  }
}

test('token is valid when fresh', () => {
  const token = createToken({ userId: 1 }, 'secret', 3600000);
  const result = verifyToken(token, 'secret');
  expect(result.valid).toBe(true);
  expect(result.payload.userId).toBe(1);
});

test('token fails with wrong secret', () => {
  const token = createToken({ userId: 1 }, 'secret', 3600000);
  const result = verifyToken(token, 'wrong-secret');
  expect(result.valid).toBe(false);
  expect(result.error).toBe('Invalid signature');
});

test('token expires after TTL', () => {
  const token = createToken({ userId: 1 }, 'secret', 1000);
  vi.advanceTimersByTime(1001);
  const result = verifyToken(token, 'secret');
  expect(result.valid).toBe(false);
  expect(result.error).toBe('Token expired');
});

vi.useRealTimers();
```

## Explanation

`Real` Test token creation, validation, and expiry.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function createToken(payload: object, secret: string, expiresInMs: number) {
  const header = btoa(JSON.stringify({ alg: 'simple', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + expiresInMs }));
  const sig = btoa(secret + body);
  return \`\${header}.\${body}.\${sig}\`;
}

function verifyToken(token: string, secret: string): { valid: boolean; payload?: any; error?: string } {
  try {
    const [, body, sig] = token.split('.');
    if (sig !== btoa(secret + body)) return { valid: false, error: 'Invalid signature' };
    const payload = JSON.parse(atob(body));
    if (payload.exp < Date.now()) return { valid: false, error: 'Token expired' };
    return { valid: true, payload };
  } catch {
    return { valid: false, error: 'Malformed token' };
  }
}

test('token is valid when fresh', () => {
  const token = createToken({ userId: 1 }, 'secret', 3600000);
  const result = verifyToken(token, 'secret');
  // TODO: add assertion using Real-World: testing a JWT-like token system
  // TODO: add assertion using Real-World: testing a JWT-like token system
});

test('token fails with wrong secret', () => {
  const token = createToken({ userId: 1 }, 'secret', 3600000);
  const result = verifyToken(token, 'wrong-secret');
  // TODO: add assertion using Real-World: testing a JWT-like token system
  // TODO: add assertion using Real-World: testing a JWT-like token system
});

test('token expires after TTL', () => {
  const token = createToken({ userId: 1 }, 'secret', 1000);
  vi.advanceTimersByTime(1001);
  const result = verifyToken(token, 'secret');
  // TODO: add assertion using Real-World: testing a JWT-like token system
  // TODO: add assertion using Real-World: testing a JWT-like token system
});

vi.useRealTimers();
```
