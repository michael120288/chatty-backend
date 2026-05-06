# Mocking Default Export

**Level:** 77
**ID:** `vitest-077`
**XP:** 100
**Tags:** `vi.mock`, `default-export`, `module`

## Objective

Mock a module with a default export using vi.mock().

## Story

The module exports a default function. Replace it with a mock.

## Hints
1. Default exports use the 'default' key in the factory object.
2. greet('Alice') calls the mocked default.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
import greet from './greeter.js';
vi.mock('./greeter.js', () => ({ default: vi.fn(() => 'mocked greeting') }));
test('default mocked', () => {
  expect(greet('Alice')).toBe('mocked greeting');
});
```

## Explanation

Vitest's `Mocking Default Export` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';
import greet from './greeter.js';

vi.mock('./greeter.js', () => ({
  default: vi.fn(() => 'mocked greeting')
}));

test('default export is mocked', () => {
  // TODO: Assert greet('Alice') returns 'mocked greeting'
});
```
