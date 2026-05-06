# test.todo

**Level:** 95
**ID:** `vitest-095`
**XP:** 100
**Tags:** `test.todo`, `placeholder`, `planning`

## Objective

Use test.todo to create placeholder tests without implementations.

## Story

Document a test you plan to write — use test.todo as a placeholder.

## Hints
1. test.todo('description') — no callback needed.
2. These appear in output as 'todo' items.

## Solution

```javascript
import { test, expect } from 'vitest';
test('existing', () => { expect(true).toBe(true); });
test.todo('should handle empty input');
test.todo('should validate email format');
test.todo('should throw on negative values');
```

## Explanation

Vitest's `test.todo` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('existing feature works', () => {
  expect(true).toBe(true);
});

// TODO: Add three test.todo placeholders for:
// 1. 'should handle empty input'
// 2. 'should validate email format'
// 3. 'should throw on negative values'
```
