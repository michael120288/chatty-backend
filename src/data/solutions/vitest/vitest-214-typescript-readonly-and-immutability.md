# TypeScript: readonly and immutability

**Level:** 214
**ID:** `vitest-214`
**XP:** 210
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: readonly and immutability so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: readonly and immutability to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

function deepFreeze<T extends object>(obj: T): Readonly<T> {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(name => {
    const val = (obj as any)[name];
    if (val && typeof val === 'object') deepFreeze(val);
  });
  return obj;
}

test('deepFreeze prevents modification', () => {
  const config = deepFreeze({ db: { host: 'localhost', port: 5432 }, debug: false });
  expect(() => { (config as any).debug = true; }).toThrow();
  expect(config.debug).toBe(false);
  expect(config.db.host).toBe('localhost');
});

test('frozen nested objects', () => {
  const obj = deepFreeze({ nested: { value: 42 } });
  expect(() => { (obj.nested as any).value = 99; }).toThrow();
  expect(obj.nested.value).toBe(42);
});
```

## Explanation

`TypeScript` Test that readonly types prevent mutation at runtime.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function deepFreeze<T extends object>(obj: T): Readonly<T> {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(name => {
    const val = (obj as any)[name];
    if (val && typeof val === 'object') deepFreeze(val);
  });
  return obj;
}

test('deepFreeze prevents modification', () => {
  const config = deepFreeze({ db: { host: 'localhost', port: 5432 }, debug: false });
  // TODO: add assertion using TypeScript: readonly and immutability
  // TODO: add assertion using TypeScript: readonly and immutability
  // TODO: add assertion using TypeScript: readonly and immutability
});

test('frozen nested objects', () => {
  const obj = deepFreeze({ nested: { value: 42 } });
  // TODO: add assertion using TypeScript: readonly and immutability
  // TODO: add assertion using TypeScript: readonly and immutability
});
```
