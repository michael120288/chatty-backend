# Advanced Patterns: toBeTypeOf()

**Level:** 169
**ID:** `vitest-169`
**XP:** 170
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: toBeTypeOf so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: toBeTypeOf() to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

function processInput(input) {
  if (typeof input === 'string') return { type: 'string', value: input.trim() };
  if (typeof input === 'number') return { type: 'number', value: input * 2 };
  return { type: 'unknown', value: null };
}

test('toBeTypeOf checks', () => {
  const strResult = processInput('  hello  ');
  expect(strResult.type).toBeTypeOf('string');
  expect(strResult.value).toBeTypeOf('string');

  const numResult = processInput(5);
  expect(numResult.type).toBeTypeOf('string');
  expect(numResult.value).toBeTypeOf('number');
});
```

## Explanation

`Advanced Patterns` Use Vitest's toBeTypeOf() matcher for type checking.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function processInput(input) {
  if (typeof input === 'string') return { type: 'string', value: input.trim() };
  if (typeof input === 'number') return { type: 'number', value: input * 2 };
  return { type: 'unknown', value: null };
}

test('toBeTypeOf checks', () => {
  const strResult = processInput('  hello  ');
  // TODO: add assertion using Advanced Patterns: toBeTypeOf
  // TODO: add assertion using Advanced Patterns: toBeTypeOf

  const numResult = processInput(5);
  // TODO: add assertion using Advanced Patterns: toBeTypeOf
  // TODO: add assertion using Advanced Patterns: toBeTypeOf
});
```
