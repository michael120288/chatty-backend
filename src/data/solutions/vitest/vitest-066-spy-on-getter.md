# Spy on Getter

**Level:** 66
**ID:** `vitest-066`
**XP:** 100
**Tags:** `vi.spyOn`, `getter`, `accessor`

## Objective

Use vi.spyOn with accessor 'get' to spy on a property getter.

## Story

Properties can be spied on too — intercept a getter.

## Hints
1. vi.spyOn(obj, 'prop', 'get') — third argument 'get' targets the getter.
2. Access config.apiUrl to trigger the getter.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const config = { get apiUrl() { return 'https://api.prod.com'; } };
test('spy getter', () => {
  const spy = vi.spyOn(config, 'apiUrl', 'get').mockReturnValue('https://api.test.com');
  expect(config.apiUrl).toBe('https://api.test.com');
  expect(spy).toHaveBeenCalledTimes(1);
  spy.mockRestore();
});
```

## Explanation

Vitest's `Spy on Getter` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

const config = {
  get apiUrl() { return 'https://api.prod.com'; }
};

test('spy on getter', () => {
  const spy = vi.spyOn(config, 'apiUrl', 'get').mockReturnValue('https://api.test.com');

  // TODO: Assert config.apiUrl is 'https://api.test.com'
  // TODO: Assert spy was called once

  spy.mockRestore();
});
```
