# expect.poll — retry assertion until it passes

**Level:** 269
**ID:** `vitest-269`
**XP:** 220
**Tags:** `async`, `polling`

## Objective

Complete the starter code using expect.poll so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use expect.poll to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test, expect } from 'vitest';

test('expect.poll waits for value to change', async () => {
  let value = 0;
  const timer = setInterval(() => { value++; }, 10);
  await expect.poll(() => value).toBeGreaterThanOrEqual(5);
  clearInterval(timer);
  expect(value).toBeGreaterThanOrEqual(5);
});

test('expect.poll with custom timeout and interval', async () => {
  let ready = false;
  setTimeout(() => { ready = true; }, 50);
  await expect.poll(() => ready, { timeout: 500, interval: 20 }).toBe(true);
  expect(ready).toBe(true);
});

test('expect.poll on async function', async () => {
  let counter = 0;
  const id = setInterval(() => counter++, 10);
  await expect.poll(async () => counter).toBeGreaterThan(2);
  clearInterval(id);
  expect(counter).toBeGreaterThan(2);
});

test('expect.poll with array accumulation', async () => {
  const results = [];
  const id = setInterval(() => results.push(results.length), 5);
  await expect.poll(() => results).toHaveLength(3);
  clearInterval(id);
  expect(results.length).toBeGreaterThanOrEqual(3);
});
```

## Explanation

`expect.poll` expect.poll() keeps retrying the assertion callback until it passes or a timeout is reached.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('expect.poll waits for value to change', async () => {
  let value = 0;
  const timer = setInterval(() => { value++; }, 10);

  await expect.poll(() => value).toBeGreaterThanOrEqual(5);

  clearInterval(timer);
  // TODO: add assertion using expect.poll
});

test('expect.poll with custom timeout and interval', async () => {
  let ready = false;
  setTimeout(() => { ready = true; }, 50);

  await expect.poll(() => ready, { timeout: 500, interval: 20 }).toBe(true);
  // TODO: add assertion using expect.poll
});

test('expect.poll on async function', async () => {
  let counter = 0;
  const increment = () => new Promise(resolve => {
    setTimeout(() => { counter++; resolve(counter); }, 10);
  });

  setInterval(increment, 10);
  await expect.poll(async () => counter).toBeGreaterThan(2);
  // TODO: add assertion using expect.poll
});

test('expect.poll with array accumulation', async () => {
  const results = [];
  const id = setInterval(() => results.push(results.length), 5);

  await expect.poll(() => results).toHaveLength(3);
  clearInterval(id);
  // TODO: add assertion using expect.poll
});
```
