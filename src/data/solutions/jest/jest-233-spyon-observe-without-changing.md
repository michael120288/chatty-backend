# spyOn — Observe Without Changing

**Level:** 233
**ID:** `jest-233`
**XP:** 120
**Tags:** `spyOn`, `observe`, `mockRestore`

## Objective

Use jest.spyOn to observe calls without replacing the implementation.

## Story

Watch the blacksmith work without interfering. Spy but keep the real implementation.

## Hints
1. jest.spyOn wraps the real method — it still executes.
2. spy records calls just like jest.fn().
3. mockRestore() removes the spy and restores the original.

## Solution

```javascript
const smith = {
  forge(item) { return `forged ${item}`; }
};

test('spy preserves real impl', () => {
  const spy = jest.spyOn(smith, 'forge');
  const result = smith.forge('sword');
  expect(result).toBe('forged sword'); // real impl still runs
  expect(spy).toHaveBeenCalledWith('sword');
  spy.mockRestore();
});
```

## Explanation

Complex mock setups with implementation per call:

```
const mockFn = jest.fn()
  .mockReturnValueOnce('first')   // first call returns 'first'
  .mockReturnValueOnce('second')  // second call returns 'second'
  .mockReturnValue('default');    // all subsequent calls

expect(mockFn()).toBe('first');
expect(mockFn()).toBe('second');
expect(mockFn()).toBe('default');
```

## Starter Code

```javascript
const smith = {
  forge(item) { return `forged ${item}`; }
};

test('spy preserves real impl', () => {
  const spy = jest.spyOn(smith, 'forge');
  const result = smith.forge('sword');
  // TODO: Assert that result equals 'forged sword' using .toBe().
  // TODO: Assert that spy was called with the expected arguments.
  spy.mockRestore();
});
```
