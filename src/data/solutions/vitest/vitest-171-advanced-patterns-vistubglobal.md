# Advanced Patterns: vi.stubGlobal()

**Level:** 171
**ID:** `vitest-171`
**XP:** 190
**Tags:** `stubs`, `globals`

## Objective

Complete the starter code using Advanced Patterns: vi.stubGlobal so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: vi.stubGlobal() to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

function getWindowTitle() {
  return typeof window !== 'undefined' ? window.document?.title || 'no title' : 'server';
}

test('vi.stubGlobal replaces global', () => {
  vi.stubGlobal('window', { document: { title: 'Test Page' } });
  expect(getWindowTitle()).toBe('Test Page');
  vi.unstubAllGlobals();
});

test('after unstub, global is restored', () => {
  const result = getWindowTitle();
  expect(typeof result).toBe('string');
});
```

## Explanation

`Advanced Patterns` Use vi.stubGlobal() to replace global variables in tests.

## Starter Code

```javascript
import { test, expect, vi, afterEach } from 'vitest';

function getWindowTitle() {
  return typeof window !== 'undefined' ? window.document?.title || 'no title' : 'server';
}

test('vi.stubGlobal replaces global', () => {
  vi.stubGlobal('window', { document: { title: 'Test Page' } });
  // TODO: add assertion using Advanced Patterns: vi.stubGlobal
  vi.unstubAllGlobals();
});

test('after unstub, global is restored', () => {
  const result = getWindowTitle();
  // TODO: add assertion using Advanced Patterns: vi.stubGlobal
});
```
