# mockRejectedValue

**Level:** 52
**ID:** `vitest-052`
**XP:** 100
**Tags:** `mockRejectedValue`, `async`, `errors`

## Objective

Use mockRejectedValue to simulate a failed async operation.

## Story

An API call fails. Mock the rejection to test error handling.

## Hints
1. await expect(api()).rejects.toThrow('Network timeout')

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('API error', async () => {
  const api = vi.fn().mockRejectedValue(new Error('Network timeout'));
  await expect(api()).rejects.toThrow('Network timeout');
});
```

## Explanation

Vitest's `mockRejectedValue` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('handles API error', async () => {
  const api = vi.fn().mockRejectedValue(new Error('Network timeout'));

  // TODO: Assert api() rejects with 'Network timeout'
});
```
