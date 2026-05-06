# TypeScript: discriminated unions

**Level:** 205
**ID:** `vitest-205`
**XP:** 210
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: discriminated unions so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: discriminated unions to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function parseNumber(input: string): Result<number> {
  const n = parseFloat(input);
  if (isNaN(n)) return { success: false, error: \`'\${input}' is not a number\` };
  return { success: true, data: n };
}

function unwrap<T>(result: Result<T>): T {
  if (!result.success) throw new Error(result.error);
  return result.data;
}

test('parseNumber discriminated union', () => {
  const ok = parseNumber('3.14');
  expect(ok.success).toBe(true);
  if (ok.success) expect(ok.data).toBe(3.14);

  const fail = parseNumber('abc');
  expect(fail.success).toBe(false);
  if (!fail.success) expect(fail.error).toContain('abc');
});

test('unwrap throws on failure', () => {
  expect(() => unwrap(parseNumber('nope'))).toThrow();
  expect(unwrap(parseNumber('42'))).toBe(42);
});
```

## Explanation

`TypeScript` Test functions that handle discriminated union types.

## Starter Code

```javascript
import { test, expect } from 'vitest';

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function parseNumber(input: string): Result<number> {
  const n = parseFloat(input);
  if (isNaN(n)) return { success: false, error: \`'\${input}' is not a number\` };
  return { success: true, data: n };
}

function unwrap<T>(result: Result<T>): T {
  if (!result.success) throw new Error(result.error);
  return result.data;
}

test('parseNumber discriminated union', () => {
  const ok = parseNumber('3.14');
  // TODO: add assertion using TypeScript: discriminated unions
  if (ok.success) expect(ok.data).toBe(3.14);

  const fail = parseNumber('abc');
  // TODO: add assertion using TypeScript: discriminated unions
  if (!fail.success) expect(fail.error).toContain('abc');
});

test('unwrap throws on failure', () => {
  // TODO: add assertion using TypeScript: discriminated unions
  // TODO: add assertion using TypeScript: discriminated unions
});
```
