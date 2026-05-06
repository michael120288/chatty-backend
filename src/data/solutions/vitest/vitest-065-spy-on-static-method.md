# Spy on Static Method

**Level:** 65
**ID:** `vitest-065`
**XP:** 100
**Tags:** `vi.spyOn`, `static`, `class`

## Objective

Use vi.spyOn on a static method.

## Story

Intercept a static class method — spied directly on the class, not an instance.

## Hints
1. vi.spyOn(ClassName, 'staticMethod') — pass the class itself.
2. Config.load() uses the spy now.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
class Config { static load() { return { env: 'production', debug: false }; } }
test('spy static', () => {
  const spy = vi.spyOn(Config, 'load').mockReturnValue({ env: 'test', debug: true });
  const cfg = Config.load();
  expect(cfg.env).toBe('test');
  expect(spy).toHaveBeenCalledTimes(1);
  spy.mockRestore();
});
```

## Explanation

Vitest's `Spy on Static Method` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

class Config {
  static load() { return { env: 'production', debug: false }; }
}

test('spy on static method', () => {
  const spy = vi.spyOn(Config, 'load').mockReturnValue({ env: 'test', debug: true });

  const cfg = Config.load();
  // TODO: Assert cfg.env is 'test'
  // TODO: Assert spy called once

  spy.mockRestore();
});
```
