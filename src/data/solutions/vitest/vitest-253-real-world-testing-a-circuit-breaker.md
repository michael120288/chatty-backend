# Real-World: testing a circuit breaker

**Level:** 253
**ID:** `vitest-253`
**XP:** 320
**Tags:** `patterns`, `resilience`

## Objective

Complete the starter code using Real-World: testing a circuit breaker so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a circuit breaker to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime = 0;

  constructor(
    private threshold: number = 3,
    private resetTimeout: number = 5000
  ) {}

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failureCount = 0;
      }
      return result;
    } catch (err) {
      this.failureCount++;
      this.lastFailureTime = Date.now();
      if (this.failureCount >= this.threshold) this.state = 'OPEN';
      throw err;
    }
  }

  getState(): CircuitState { return this.state; }
}

test('circuit breaker opens after threshold failures', async () => {
  const cb = new CircuitBreaker(3);
  const failing = vi.fn().mockRejectedValue(new Error('Service down'));

  for (let i = 0; i < 3; i++) {
    await expect(cb.call(failing)).rejects.toThrow('Service down');
  }
  expect(cb.getState()).toBe('OPEN');
  await expect(cb.call(failing)).rejects.toThrow('Circuit breaker is OPEN');
});

test('circuit breaker resets after timeout', async () => {
  const cb = new CircuitBreaker(2, 1000);
  const failing = vi.fn().mockRejectedValue(new Error('fail'));

  await expect(cb.call(failing)).rejects.toThrow();
  await expect(cb.call(failing)).rejects.toThrow();
  expect(cb.getState()).toBe('OPEN');

  vi.advanceTimersByTime(1001);
  const success = vi.fn().mockResolvedValue('ok');
  const result = await cb.call(success);
  expect(result).toBe('ok');
  expect(cb.getState()).toBe('CLOSED');
});

vi.useRealTimers();
```

## Explanation

`Real` Test a circuit breaker pattern for resilient service calls.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime = 0;

  constructor(
    private threshold: number = 3,
    private resetTimeout: number = 5000
  ) {}

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failureCount = 0;
      }
      return result;
    } catch (err) {
      this.failureCount++;
      this.lastFailureTime = Date.now();
      if (this.failureCount >= this.threshold) this.state = 'OPEN';
      throw err;
    }
  }

  getState(): CircuitState { return this.state; }
}

test('circuit breaker opens after threshold failures', async () => {
  const cb = new CircuitBreaker(3);
  const failing = vi.fn().mockRejectedValue(new Error('Service down'));

  for (let i = 0; i < 3; i++) {
    // TODO: add assertion using Real-World: testing a circuit breaker
  }
  // TODO: add assertion using Real-World: testing a circuit breaker
  // TODO: add assertion using Real-World: testing a circuit breaker
});

test('circuit breaker resets after timeout', async () => {
  const cb = new CircuitBreaker(2, 1000);
  const failing = vi.fn().mockRejectedValue(new Error('fail'));

  // TODO: add assertion using Real-World: testing a circuit breaker
  // TODO: add assertion using Real-World: testing a circuit breaker
  // TODO: add assertion using Real-World: testing a circuit breaker

  vi.advanceTimersByTime(1001);
  const success = vi.fn().mockResolvedValue('ok');
  const result = await cb.call(success);
  // TODO: add assertion using Real-World: testing a circuit breaker
  // TODO: add assertion using Real-World: testing a circuit breaker
});

vi.useRealTimers();
```
