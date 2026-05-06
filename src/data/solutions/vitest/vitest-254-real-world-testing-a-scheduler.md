# Real-World: testing a scheduler

**Level:** 254
**ID:** `vitest-254`
**XP:** 320
**Tags:** `integration`, `patterns`

## Objective

Complete the starter code using Real-World: testing a scheduler so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a scheduler to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

class Scheduler {
  private jobs = new Map<string, { fn: () => void; scheduledAt: number }>();

  schedule(id: string, fn: () => void, delayMs: number): void {
    if (this.jobs.has(id)) this.cancel(id);
    const timer = setTimeout(() => {
      fn();
      this.jobs.delete(id);
    }, delayMs);
    this.jobs.set(id, { fn, scheduledAt: Date.now() + delayMs });
  }

  cancel(id: string): boolean {
    return this.jobs.delete(id);
  }

  isPending(id: string): boolean {
    return this.jobs.has(id);
  }

  pendingCount(): number {
    return this.jobs.size;
  }
}

test('Scheduler runs job after delay', () => {
  const scheduler = new Scheduler();
  const fn = vi.fn();
  scheduler.schedule('job1', fn, 1000);
  expect(fn).not.toHaveBeenCalled();
  vi.advanceTimersByTime(1000);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(scheduler.isPending('job1')).toBe(false);
});

test('Scheduler deduplicates by id', () => {
  const scheduler = new Scheduler();
  const fn1 = vi.fn();
  const fn2 = vi.fn();
  scheduler.schedule('dedup', fn1, 500);
  scheduler.schedule('dedup', fn2, 500);
  vi.advanceTimersByTime(500);
  expect(fn1).not.toHaveBeenCalled();
  expect(fn2).toHaveBeenCalledTimes(1);
});

test('Scheduler cancel prevents execution', () => {
  const scheduler = new Scheduler();
  const fn = vi.fn();
  scheduler.schedule('cancel-me', fn, 1000);
  expect(scheduler.cancel('cancel-me')).toBe(true);
  vi.advanceTimersByTime(1000);
  expect(fn).not.toHaveBeenCalled();
});

vi.useRealTimers();
```

## Explanation

`Real` Test a job scheduler with priority and deduplication.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

class Scheduler {
  private jobs = new Map<string, { fn: () => void; scheduledAt: number }>();

  schedule(id: string, fn: () => void, delayMs: number): void {
    if (this.jobs.has(id)) this.cancel(id);
    const timer = setTimeout(() => {
      fn();
      this.jobs.delete(id);
    }, delayMs);
    this.jobs.set(id, { fn, scheduledAt: Date.now() + delayMs });
  }

  cancel(id: string): boolean {
    return this.jobs.delete(id);
  }

  isPending(id: string): boolean {
    return this.jobs.has(id);
  }

  pendingCount(): number {
    return this.jobs.size;
  }
}

test('Scheduler runs job after delay', () => {
  const scheduler = new Scheduler();
  const fn = vi.fn();
  scheduler.schedule('job1', fn, 1000);
  // TODO: add assertion using Real-World: testing a scheduler
  vi.advanceTimersByTime(1000);
  // TODO: add assertion using Real-World: testing a scheduler
  // TODO: add assertion using Real-World: testing a scheduler
});

test('Scheduler deduplicates by id', () => {
  const scheduler = new Scheduler();
  const fn1 = vi.fn();
  const fn2 = vi.fn();
  scheduler.schedule('dedup', fn1, 500);
  scheduler.schedule('dedup', fn2, 500);
  vi.advanceTimersByTime(500);
  // TODO: add assertion using Real-World: testing a scheduler
  // TODO: add assertion using Real-World: testing a scheduler
});

test('Scheduler cancel prevents execution', () => {
  const scheduler = new Scheduler();
  const fn = vi.fn();
  scheduler.schedule('cancel-me', fn, 1000);
  // TODO: add assertion using Real-World: testing a scheduler
  vi.advanceTimersByTime(1000);
  // TODO: add assertion using Real-World: testing a scheduler
});

vi.useRealTimers();
```
