# Mocking Node fs Module

**Level:** 89
**ID:** `vitest-089`
**XP:** 100
**Tags:** `fs`, `vi.spyOn`, `node-modules`

## Objective

Mock the fs module's readFileSync to return controlled content.

## Story

Don't read real files during tests — mock the fs module.

## Hints
1. vi.spyOn(fs, 'readFileSync').mockReturnValue(jsonString)
2. JSON.parse will parse the mocked string.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
import fs from 'node:fs';
function readConfig(path) { return JSON.parse(fs.readFileSync(path,'utf-8')); }
test('readConfig', () => {
  vi.spyOn(fs,'readFileSync').mockReturnValue('{"debug":true,"port":8080}');
  const cfg = readConfig('/etc/app.conf');
  expect(cfg.debug).toBe(true);
  expect(cfg.port).toBe(8080);
  vi.restoreAllMocks();
});
```

## Explanation

Vitest's `Mocking Node fs Module` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';
import fs from 'node:fs';

function readConfig(path) {
  const content = fs.readFileSync(path, 'utf-8');
  return JSON.parse(content);
}

test('readConfig returns parsed JSON', () => {
  vi.spyOn(fs, 'readFileSync').mockReturnValue('{"debug":true,"port":8080}');

  const config = readConfig('/etc/app.conf');
  // TODO: Assert config.debug is true
  // TODO: Assert config.port is 8080

  vi.restoreAllMocks();
});
```
