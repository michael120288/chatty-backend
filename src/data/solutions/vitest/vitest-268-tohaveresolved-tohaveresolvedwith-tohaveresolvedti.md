# toHaveResolved / toHaveResolvedWith / toHaveResolvedTimes

**Level:** 268
**ID:** `vitest-268`
**XP:** 210
**Tags:** `promises`, `assertions`

## Objective

Complete the starter code using toHaveResolved / toHaveResolvedWith / toHaveResolvedTimes so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use toHaveResolved / toHaveResolvedWith / toHaveResolvedTimes to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test, expect, vi } from 'vitest';

test('toHaveResolved — spy resolved at least once', async () => {
  const fetchUser = vi.fn().mockResolvedValue({ id: 1, name: 'Alice' });
  await fetchUser(1);
  expect(fetchUser).toHaveResolved();
});

test('toHaveResolvedWith — spy resolved with specific value', async () => {
  const getConfig = vi.fn().mockResolvedValue({ env: 'test', debug: true });
  await getConfig();
  expect(getConfig).toHaveResolvedWith({ env: 'test', debug: true });
});

test('toHaveResolvedTimes — spy resolved correct number of times', async () => {
  const ping = vi.fn()
    .mockResolvedValueOnce('pong-1')
    .mockResolvedValueOnce('pong-2')
    .mockResolvedValueOnce('pong-3');
  await ping(); await ping(); await ping();
  expect(ping).toHaveResolvedTimes(3);
});

test('toHaveLastResolvedWith — most recent resolution value', async () => {
  const load = vi.fn()
    .mockResolvedValueOnce({ page: 1, data: ['a'] })
    .mockResolvedValueOnce({ page: 2, data: ['b', 'c'] });
  await load(); await load();
  expect(load).toHaveLastResolvedWith({ page: 2, data: ['b', 'c'] });
});

test('toHaveNthResolvedWith — nth resolution value', async () => {
  const fetch = vi.fn()
    .mockResolvedValueOnce('first')
    .mockResolvedValueOnce('second')
    .mockResolvedValueOnce('third');
  await fetch(); await fetch(); await fetch();
  expect(fetch).toHaveNthResolvedWith(1, 'first');
  expect(fetch).toHaveNthResolvedWith(2, 'second');
  expect(fetch).toHaveNthResolvedWith(3, 'third');
});
```

## Explanation

`toHaveResolved / toHaveResolvedWith / toHaveResolvedTimes` Assert that a spy that returns Promises resolved successfully, how many times, and with what value.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('toHaveResolved — spy resolved at least once', async () => {
  const fetchUser = vi.fn().mockResolvedValue({ id: 1, name: 'Alice' });
  await fetchUser(1);
  // TODO: add assertion using toHaveResolved / toHaveResolvedWith / toHaveResolvedTimes
});

test('toHaveResolvedWith — spy resolved with specific value', async () => {
  const getConfig = vi.fn().mockResolvedValue({ env: 'test', debug: true });
  await getConfig();
  // TODO: add assertion using toHaveResolved / toHaveResolvedWith / toHaveResolvedTimes
});

test('toHaveResolvedTimes — spy resolved correct number of times', async () => {
  const ping = vi.fn()
    .mockResolvedValueOnce('pong-1')
    .mockResolvedValueOnce('pong-2')
    .mockResolvedValueOnce('pong-3');

  await ping();
  await ping();
  await ping();

  // TODO: add assertion using toHaveResolved / toHaveResolvedWith / toHaveResolvedTimes
});

test('toHaveLastResolvedWith — most recent resolution value', async () => {
  const load = vi.fn()
    .mockResolvedValueOnce({ page: 1, data: ['a'] })
    .mockResolvedValueOnce({ page: 2, data: ['b', 'c'] });

  await load();
  await load();

  // TODO: add assertion using toHaveResolved / toHaveResolvedWith / toHaveResolvedTimes
});

test('toHaveNthResolvedWith — nth resolution value', async () => {
  const fetch = vi.fn()
    .mockResolvedValueOnce('first')
    .mockResolvedValueOnce('second')
    .mockResolvedValueOnce('third');

  await fetch(); await fetch(); await fetch();

  // TODO: add assertion using toHaveResolved / toHaveResolvedWith / toHaveResolvedTimes
  // TODO: add assertion using toHaveResolved / toHaveResolvedWith / toHaveResolvedTimes
  // TODO: add assertion using toHaveResolved / toHaveResolvedWith / toHaveResolvedTimes
});
```
