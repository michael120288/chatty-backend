# Spy Call Order

**Level:** 72
**ID:** `vitest-072`
**XP:** 100
**Tags:** `invocationCallOrder`, `vi.spyOn`, `call-order`

## Objective

Use mock.invocationCallOrder to check that methods were called in order.

## Story

Verify methods were called in the correct sequence.

## Hints
1. spy.mock.invocationCallOrder[0] gives the global call sequence number.
2. A lower number means earlier call.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const pipeline = { validate: ()=>true, transform: x=>x, save: x=>x };
function process(data) { pipeline.validate(data); pipeline.transform(data); pipeline.save(data); }
test('order', () => {
  const v = vi.spyOn(pipeline,'validate');
  const t = vi.spyOn(pipeline,'transform');
  const s = vi.spyOn(pipeline,'save');
  process('data');
  expect(v).toHaveBeenCalledTimes(1);
  expect(t).toHaveBeenCalledTimes(1);
  expect(s).toHaveBeenCalledTimes(1);
  expect(v.mock.invocationCallOrder[0]).toBeLessThan(t.mock.invocationCallOrder[0]);
  vi.restoreAllMocks();
});
```

## Explanation

Vitest's `Spy Call Order` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

const pipeline = {
  validate: () => true,
  transform: (x) => x,
  save: (x) => x
};

function process(data) {
  pipeline.validate(data);
  pipeline.transform(data);
  pipeline.save(data);
}

test('pipeline steps called in order', () => {
  const v = vi.spyOn(pipeline, 'validate');
  const t = vi.spyOn(pipeline, 'transform');
  const s = vi.spyOn(pipeline, 'save');

  process('data');

  // TODO: Assert each spy was called once
  // TODO: Assert validate was called before transform (check invocationCallOrder)

  vi.restoreAllMocks();
});
```
