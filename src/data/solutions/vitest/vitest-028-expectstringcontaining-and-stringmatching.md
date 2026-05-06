# expect.stringContaining and stringMatching

**Level:** 28
**ID:** `vitest-028`
**XP:** 100
**Tags:** `stringContaining`, `stringMatching`, `asymmetric`

## Objective

Use expect.stringContaining and expect.stringMatching inside toEqual.

## Story

Match partial strings asymmetrically inside larger assertions.

## Hints
1. expect(log).toEqual(expect.objectContaining({ message: expect.stringContaining('Connection') }))
2. expect.stringMatching(/regex/)

## Solution

```javascript
import { test, expect } from 'vitest';
test('contains ERROR', () => {
  const log = { level: 'ERROR', message: 'Connection refused on port 5432' };
  expect(log).toEqual(expect.objectContaining({ message: expect.stringContaining('Connection') }));
});
test('matches timestamp', () => {
  const log = { time: '2024-01-15T10:30:00Z', msg: 'ok' };
  expect(log).toEqual(expect.objectContaining({ time: expect.stringMatching(/^\d{4}-/) }));
});
```

## Explanation

Vitest's `expect.stringContaining and stringMatching` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('log entry contains ERROR', () => {
  const log = { level: 'ERROR', message: 'Connection refused on port 5432' };
  // TODO: Assert log.message contains 'Connection'
});

test('log message matches timestamp pattern', () => {
  const log = { time: '2024-01-15T10:30:00Z', msg: 'ok' };
  // TODO: Assert log.time matches /^\d{4}-/
});
```
