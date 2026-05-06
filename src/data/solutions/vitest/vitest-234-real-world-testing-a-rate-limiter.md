# Real-World: testing a rate limiter

**Level:** 234
**ID:** `vitest-234`
**XP:** 270
**Tags:** `patterns`, `rate limiting`

## Objective

Complete the starter code using Real-World: testing a rate limiter so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a rate limiter to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

class RateLimiter {
  private tokens: number;
  private lastRefill: number;

  constructor(private maxTokens: number, private refillRate: number) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  consume(n = 1): boolean {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
    if (this.tokens >= n) { this.tokens -= n; return true; }
    return false;
  }
}

test('rate limiter allows within limit', () => {
  const limiter = new RateLimiter(5, 1);
  expect(limiter.consume()).toBe(true);
  expect(limiter.consume()).toBe(true);
  expect(limiter.consume()).toBe(true);
  expect(limiter.consume()).toBe(true);
  expect(limiter.consume()).toBe(true);
  expect(limiter.consume()).toBe(false);
});

test('rate limiter refills over time', () => {
  const limiter = new RateLimiter(2, 2);
  expect(limiter.consume()).toBe(true);
  expect(limiter.consume()).toBe(true);
  expect(limiter.consume()).toBe(false);
  vi.advanceTimersByTime(1000);
  expect(limiter.consume()).toBe(true);
  expect(limiter.consume()).toBe(true);
});

vi.useRealTimers();
```

## Explanation

`Real` Test a token bucket rate limiter with fake timers.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

class RateLimiter {
  private tokens: number;
  private lastRefill: number;

  constructor(private maxTokens: number, private refillRate: number) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  consume(n = 1): boolean {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
    if (this.tokens >= n) { this.tokens -= n; return true; }
    return false;
  }
}

test('rate limiter allows within limit', () => {
  const limiter = new RateLimiter(5, 1);
  // TODO: add assertion using Real-World: testing a rate limiter
  // TODO: add assertion using Real-World: testing a rate limiter
  // TODO: add assertion using Real-World: testing a rate limiter
  // TODO: add assertion using Real-World: testing a rate limiter
  // TODO: add assertion using Real-World: testing a rate limiter
  // TODO: add assertion using Real-World: testing a rate limiter
});

test('rate limiter refills over time', () => {
  const limiter = new RateLimiter(2, 2);
  // TODO: add assertion using Real-World: testing a rate limiter
  // TODO: add assertion using Real-World: testing a rate limiter
  // TODO: add assertion using Real-World: testing a rate limiter
  vi.advanceTimersByTime(1000);
  // TODO: add assertion using Real-World: testing a rate limiter
  // TODO: add assertion using Real-World: testing a rate limiter
});

vi.useRealTimers();
```
