# Spy Boss: Intercepting a Full Service

**Level:** 75
**ID:** `vitest-075`
**XP:** 150
**Tags:** `vi.spyOn`, `boss`, `pipeline`, `coordination`

## Objective

Spy on three methods of a service and verify their coordination.

## Story

A service calls validate, fetch, and cache. Spy on all three and verify the pipeline.

## Hints
1. Check each spy with toHaveBeenCalledWith.
2. cSpy called with (5, { id: 5, data: 'mocked' })

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const dataService = {
  validate: id => id > 0,
  fetch: id => ({ id, data: 'real' }),
  cache: (id, data) => `cached:${id}`
};
function loadData(id) {
  if (!dataService.validate(id)) throw new Error('invalid');
  const data = dataService.fetch(id);
  dataService.cache(id, data);
  return data;
}
test('pipeline', () => {
  const vSpy = vi.spyOn(dataService, 'validate');
  const fSpy = vi.spyOn(dataService, 'fetch').mockReturnValue({ id: 5, data: 'mocked' });
  const cSpy = vi.spyOn(dataService, 'cache');
  const result = loadData(5);
  expect(result.data).toBe('mocked');
  expect(vSpy).toHaveBeenCalledWith(5);
  expect(fSpy).toHaveBeenCalledWith(5);
  expect(cSpy).toHaveBeenCalledWith(5, { id: 5, data: 'mocked' });
  vi.restoreAllMocks();
});
```

## Explanation

Vitest's `Spy Boss: Intercepting a Full Service` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

const dataService = {
  validate: (id) => id > 0,
  fetch: (id) => ({ id, data: 'real' }),
  cache: (id, data) => `cached:${id}`
};

function loadData(id) {
  if (!dataService.validate(id)) throw new Error('invalid');
  const data = dataService.fetch(id);
  dataService.cache(id, data);
  return data;
}

test('loadData pipeline', () => {
  const vSpy = vi.spyOn(dataService, 'validate');
  const fSpy = vi.spyOn(dataService, 'fetch').mockReturnValue({ id: 5, data: 'mocked' });
  const cSpy = vi.spyOn(dataService, 'cache');

  const result = loadData(5);

  // TODO: Assert result.data is 'mocked'
  // TODO: Assert validate called with 5
  // TODO: Assert fetch called with 5
  // TODO: Assert cache called with 5 and the mocked data object

  vi.restoreAllMocks();
});
```
