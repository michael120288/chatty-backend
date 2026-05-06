# Mocking Date

**Level:** 88
**ID:** `vitest-088`
**XP:** 100
**Tags:** `Date`, `vi.spyOn`, `time-mocking`

## Objective

Mock the Date constructor to return a fixed date.

## Story

Code that uses new Date() is non-deterministic. Mock it for predictable tests.

## Hints
1. vi.spyOn(globalThis, 'Date') mocks the Date constructor.
2. mockDate.getFullYear() === 2030

## Solution

```javascript
import { test, expect, vi } from 'vitest';
function getYear() { return new Date().getFullYear(); }
test('mocked year', () => {
  const mockDate = new Date('2030-06-15');
  vi.spyOn(globalThis, 'Date').mockImplementation(() => mockDate);
  expect(getYear()).toBe(2030);
  vi.restoreAllMocks();
});
```

## Explanation

Vitest's `Mocking Date` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

function getYear() {
  return new Date().getFullYear();
}

test('getYear returns mocked year', () => {
  const mockDate = new Date('2030-06-15');
  vi.spyOn(globalThis, 'Date').mockImplementation(() => mockDate);

  // TODO: Assert getYear() returns 2030

  vi.restoreAllMocks();
});
```
