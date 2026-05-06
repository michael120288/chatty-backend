# Spy in beforeEach with Cleanup

**Level:** 69
**ID:** `vitest-069`
**XP:** 100
**Tags:** `vi.spyOn`, `beforeEach`, `afterEach`, `lifecycle`

## Objective

Create a spy in beforeEach and restore it in afterEach.

## Story

Set up a spy before each test and clean it up after.

## Hints
1. beforeEach(() => { spy = vi.spyOn(service, 'getData').mockReturnValue([10, 20]); })
2. afterEach(() => { spy.mockRestore(); })

## Solution

```javascript
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
const service = { getData: () => [1,2,3] };
describe('service with spy', () => {
  let spy;
  beforeEach(() => { spy = vi.spyOn(service, 'getData').mockReturnValue([10, 20]); });
  afterEach(() => { spy.mockRestore(); });
  test('mocked array', () => { expect(service.getData()).toEqual([10, 20]); });
  test('called once', () => { service.getData(); expect(spy).toHaveBeenCalledTimes(1); });
});
```

## Explanation

Vitest's `Spy in beforeEach with Cleanup` is a powerful testing utility.

## Starter Code

```javascript
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';

const service = {
  getData: () => [1, 2, 3]
};

describe('service with spy', () => {
  let spy;

  beforeEach(() => {
    // TODO: Spy on service.getData and mock it to return [10, 20]
  });

  afterEach(() => {
    // TODO: Restore the spy
  });

  test('getData returns mocked array', () => {
    expect(service.getData()).toEqual([10, 20]);
  });

  test('spy was called once per test', () => {
    service.getData();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
```
