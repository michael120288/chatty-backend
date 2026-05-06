# TypeScript: utility types in tests

**Level:** 206
**ID:** `vitest-206`
**XP:** 200
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: utility types in tests so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: utility types in tests to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

interface Config {
  host: string;
  port: number;
  debug: boolean;
  timeout: number;
}

function mergeConfig(base: Config, overrides: Partial<Config>): Config {
  return { ...base, ...overrides };
}

function publicConfig(config: Config): Omit<Config, 'debug'> {
  const { debug, ...pub } = config;
  return pub;
}

const defaults: Config = { host: 'localhost', port: 3000, debug: false, timeout: 5000 };

test('mergeConfig with Partial', () => {
  const result = mergeConfig(defaults, { port: 8080, debug: true });
  expect(result.port).toBe(8080);
  expect(result.debug).toBe(true);
  expect(result.host).toBe('localhost');
});

test('publicConfig omits debug', () => {
  const pub = publicConfig(defaults);
  expect(pub.host).toBe('localhost');
  expect(pub.port).toBe(3000);
  expect('debug' in pub).toBe(false);
});
```

## Explanation

`TypeScript` Test code that uses Partial, Required, Pick, Omit.

## Starter Code

```javascript
import { test, expect } from 'vitest';

interface Config {
  host: string;
  port: number;
  debug: boolean;
  timeout: number;
}

function mergeConfig(base: Config, overrides: Partial<Config>): Config {
  return { ...base, ...overrides };
}

function publicConfig(config: Config): Omit<Config, 'debug'> {
  const { debug, ...pub } = config;
  return pub;
}

const defaults: Config = { host: 'localhost', port: 3000, debug: false, timeout: 5000 };

test('mergeConfig with Partial', () => {
  const result = mergeConfig(defaults, { port: 8080, debug: true });
  // TODO: add assertion using TypeScript: utility types in tests
  // TODO: add assertion using TypeScript: utility types in tests
  // TODO: add assertion using TypeScript: utility types in tests
});

test('publicConfig omits debug', () => {
  const pub = publicConfig(defaults);
  // TODO: add assertion using TypeScript: utility types in tests
  // TODO: add assertion using TypeScript: utility types in tests
  // TODO: add assertion using TypeScript: utility types in tests
});
```
