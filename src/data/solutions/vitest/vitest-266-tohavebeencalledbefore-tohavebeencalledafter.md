# toHaveBeenCalledBefore / toHaveBeenCalledAfter

**Level:** 266
**ID:** `vitest-266`
**XP:** 200
**Tags:** `spying`, `assertions`

## Objective

Complete the starter code using toHaveBeenCalledBefore / toHaveBeenCalledAfter so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use toHaveBeenCalledBefore / toHaveBeenCalledAfter to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test, expect, vi } from 'vitest';

test('toHaveBeenCalledBefore — middleware order', () => {
  const auth = vi.fn();
  const logger = vi.fn();
  const handler = vi.fn();
  auth(); logger(); handler();
  expect(auth).toHaveBeenCalledBefore(logger);
  expect(auth).toHaveBeenCalledBefore(handler);
  expect(logger).toHaveBeenCalledBefore(handler);
});

test('toHaveBeenCalledAfter — response lifecycle', () => {
  const fetchData = vi.fn();
  const processData = vi.fn();
  const renderUI = vi.fn();
  fetchData(); processData(); renderUI();
  expect(processData).toHaveBeenCalledAfter(fetchData);
  expect(renderUI).toHaveBeenCalledAfter(processData);
  expect(renderUI).toHaveBeenCalledAfter(fetchData);
});

test('not.toHaveBeenCalledBefore when order is reversed', () => {
  const first = vi.fn();
  const second = vi.fn();
  second(); first();
  expect(first).not.toHaveBeenCalledBefore(second);
  expect(second).toHaveBeenCalledBefore(first);
});

test('event sequence validation', () => {
  const onStart = vi.fn();
  const onProgress = vi.fn();
  const onComplete = vi.fn();
  onStart('init'); onProgress(50); onProgress(100); onComplete('done');
  expect(onStart).toHaveBeenCalledBefore(onProgress);
  expect(onProgress).toHaveBeenCalledBefore(onComplete);
  expect(onComplete).toHaveBeenCalledAfter(onStart);
});
```

## Explanation

`toHaveBeenCalledBefore / toHaveBeenCalledAfter` Assert the order in which mock functions were called relative to each other.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('toHaveBeenCalledBefore — middleware order', () => {
  const auth = vi.fn();
  const logger = vi.fn();
  const handler = vi.fn();

  // Simulate middleware chain: auth → logger → handler
  auth();
  logger();
  handler();

  // TODO: add assertion using toHaveBeenCalledBefore / toHaveBeenCalledAfter
  // TODO: add assertion using toHaveBeenCalledBefore / toHaveBeenCalledAfter
  // TODO: add assertion using toHaveBeenCalledBefore / toHaveBeenCalledAfter
});

test('toHaveBeenCalledAfter — response lifecycle', () => {
  const fetchData = vi.fn();
  const processData = vi.fn();
  const renderUI = vi.fn();

  fetchData();
  processData();
  renderUI();

  // TODO: add assertion using toHaveBeenCalledBefore / toHaveBeenCalledAfter
  // TODO: add assertion using toHaveBeenCalledBefore / toHaveBeenCalledAfter
  // TODO: add assertion using toHaveBeenCalledBefore / toHaveBeenCalledAfter
});

test('not.toHaveBeenCalledBefore when order is reversed', () => {
  const first = vi.fn();
  const second = vi.fn();
  second();
  first();
  // TODO: add assertion using toHaveBeenCalledBefore / toHaveBeenCalledAfter
  // TODO: add assertion using toHaveBeenCalledBefore / toHaveBeenCalledAfter
});

test('event sequence validation', () => {
  const onStart = vi.fn();
  const onProgress = vi.fn();
  const onComplete = vi.fn();

  onStart('init');
  onProgress(50);
  onProgress(100);
  onComplete('done');

  // TODO: add assertion using toHaveBeenCalledBefore / toHaveBeenCalledAfter
  // TODO: add assertion using toHaveBeenCalledBefore / toHaveBeenCalledAfter
  // TODO: add assertion using toHaveBeenCalledBefore / toHaveBeenCalledAfter
});
```
