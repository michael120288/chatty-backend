# expect.soft() — Collect All Failures

**Level:** 14
**ID:** `vitest-014`
**XP:** 100
**Tags:** `expect.soft`, `soft-assertions`, `vitest-exclusive`

## Objective

Use expect.soft() so multiple assertion failures are all reported at once.

## Story

Normally one failure stops the test. expect.soft() lets all soft assertions run before reporting.

## Hints
1. expect.soft(value).toBe(expected) — does not stop the test on failure.
2. expect.soft(cfg.host).toBe('localhost')

## Solution

```javascript
import { test, expect } from 'vitest';
function getConfig() { return { host: 'localhost', port: 3000, debug: true }; }
test('config has correct values', () => {
  const cfg = getConfig();
  expect.soft(cfg.host).toBe('localhost');
  expect.soft(cfg.port).toBe(3000);
  expect.soft(cfg.debug).toBe(true);
});
```

## Explanation

Vitest's `expect.soft()` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function getConfig() {
  return { host: 'localhost', port: 3000, debug: true };
}

test('config has correct values', () => {
  const cfg = getConfig();
  // TODO: Use expect.soft() to check host, port, and debug
  // All three checks should pass
});
```
