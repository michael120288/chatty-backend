# Workspace: test.sequential in describe

**Level:** 221
**ID:** `vitest-221`
**XP:** 200
**Tags:** `organization`, `describe`

## Objective

Complete the starter code using Workspace: test.sequential in describe so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Workspace: test.sequential in describe to implement the missing assertions and make everything pass.

## Hints
1. Section 15: Workspace & Config

## Solution

```javascript
import { describe, test, expect } from 'vitest';

describe.sequential('sequential state tests', () => {
  const state = { value: 0, history: [] as number[] };

  test('step 1: initialize', () => {
    state.value = 10;
    state.history.push(state.value);
    expect(state.value).toBe(10);
  });

  test('step 2: double', () => {
    state.value *= 2;
    state.history.push(state.value);
    expect(state.value).toBe(20);
  });

  test('step 3: add 5', () => {
    state.value += 5;
    state.history.push(state.value);
    expect(state.value).toBe(25);
    expect(state.history).toEqual([10, 20, 25]);
  });
});
```

## Explanation

`Workspace` Run tests sequentially within a describe block when order matters.

## Starter Code

```javascript
import { describe, test, expect } from 'vitest';

describe.sequential('sequential state tests', () => {
  const state = { value: 0, history: [] as number[] };

  test('step 1: initialize', () => {
    state.value = 10;
    state.history.push(state.value);
    // TODO: add assertion using Workspace: test.sequential in describe
  });

  test('step 2: double', () => {
    state.value *= 2;
    state.history.push(state.value);
    // TODO: add assertion using Workspace: test.sequential in describe
  });

  test('step 3: add 5', () => {
    state.value += 5;
    state.history.push(state.value);
    // TODO: add assertion using Workspace: test.sequential in describe
    // TODO: add assertion using Workspace: test.sequential in describe
  });
});
```
