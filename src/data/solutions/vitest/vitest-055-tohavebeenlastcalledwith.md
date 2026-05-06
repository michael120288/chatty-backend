# toHaveBeenLastCalledWith

**Level:** 55
**ID:** `vitest-055`
**XP:** 100
**Tags:** `toHaveBeenLastCalledWith`, `vi.fn`, `args`

## Objective

Use toHaveBeenLastCalledWith to inspect the most recent call.

## Story

Only the final call matters — check the last set of arguments.

## Hints
1. expect(log).toHaveBeenLastCalledWith('error', 'end')

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('last call', () => {
  const log = vi.fn();
  log('info','start'); log('warn','mid'); log('error','end');
  expect(log).toHaveBeenLastCalledWith('error', 'end');
});
```

## Explanation

Vitest's `toHaveBeenLastCalledWith` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('last call args', () => {
  const log = vi.fn();
  log('info', 'start');
  log('warn', 'mid');
  log('error', 'end');
  // TODO: Assert last call was with ('error', 'end')
});
```
