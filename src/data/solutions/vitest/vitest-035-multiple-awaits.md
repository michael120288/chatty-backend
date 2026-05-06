# Multiple Awaits

**Level:** 35
**ID:** `vitest-035`
**XP:** 100
**Tags:** `async`, `await`, `sequential`

## Objective

Write a test with multiple sequential awaits.

## Story

A sequence of async operations — await each one.

## Hints
1. const r1 = await step1(); const r2 = await step2(r1); ...

## Solution

```javascript
import { test, expect } from 'vitest';
async function step1() { return 'step1-done'; }
async function step2(prev) { return `${prev}+step2`; }
async function step3(prev) { return `${prev}+step3`; }
test('sequential', async () => {
  const r1 = await step1();
  const r2 = await step2(r1);
  const r3 = await step3(r2);
  expect(r3).toBe('step1-done+step2+step3');
});
```

## Explanation

Vitest's `Multiple Awaits` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function step1() { return 'step1-done'; }
async function step2(prev) { return `${prev}+step2`; }
async function step3(prev) { return `${prev}+step3`; }

test('sequential async steps', async () => {
  // TODO: await step1, pass result to step2, pass to step3
  // Assert final result is 'step1-done+step2+step3'
});
```
