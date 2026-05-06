# vi.spyOn() Basics

**Level:** 61
**ID:** `vitest-061`
**XP:** 100
**Tags:** `vi.spyOn`, `spy`, `basics`

## Objective

Use vi.spyOn to spy on an existing object method.

## Story

You can't replace the entire module — just watch one method with a spy.

## Hints
1. vi.spyOn(obj, 'method') wraps the method with a mock.
2. expect(spy).toHaveBeenCalledWith('hello')

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const logger = { log: (msg) => console.log(msg) };
test('spy on log', () => {
  const spy = vi.spyOn(logger, 'log');
  logger.log('hello');
  expect(spy).toHaveBeenCalledWith('hello');
  spy.mockRestore();
});
```

## Explanation

Vitest's `vi.spyOn() Basics` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

const logger = {
  log: (msg) => console.log(msg)
};

test('spy on logger.log', () => {
  const spy = vi.spyOn(logger, 'log');

  logger.log('hello');

  // TODO: Assert spy was called once with 'hello'

  spy.mockRestore();
});
```
