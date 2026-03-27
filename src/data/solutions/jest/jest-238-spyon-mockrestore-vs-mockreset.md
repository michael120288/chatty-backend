# spyOn — mockRestore vs mockReset

**Level:** 238
**ID:** `jest-238`
**XP:** 120
**Tags:** `mockReset`, `mockRestore`, `spyOn`, `difference`

## Objective

Understand and test mockRestore vs mockReset on a spy.

## Story

Know the difference: restore the original, or just reset the state.

## Hints
1. mockReset clears calls and removes mock implementation — real impl NOT restored.
2. mockRestore is only for spyOn — it fully removes the spy.
3. After mockReset, the spy still exists but returns undefined.

## Solution

```javascript
const calc = { add: (a, b) => a + b };

test('mockReset clears calls but keeps spy', () => {
  const spy = jest.spyOn(calc, 'add').mockReturnValue(99);
  calc.add(1, 2);
  expect(spy).toHaveBeenCalledTimes(1);
  spy.mockReset(); // clears calls AND return value
  expect(spy).toHaveBeenCalledTimes(0);
  expect(calc.add(1, 2)).toBeUndefined(); // return value gone after mockReset
  spy.mockRestore();
});

test('mockRestore returns original impl', () => {
  const spy = jest.spyOn(calc, 'add').mockReturnValue(99);
  spy.mockRestore(); // restores real add()
  expect(calc.add(1, 2)).toBe(3); // real impl back
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
const calc = { add: (a, b) => a + b };

test('mockReset clears calls but keeps spy', () => {
  const spy = jest.spyOn(calc, 'add').mockReturnValue(99);
  calc.add(1, 2);
  expect(spy).toHaveBeenCalledTimes(1);
  spy.mockReset(); // clears calls AND return value
  // TODO: Assert that spy was called exactly 0 times.
  // TODO: Assert that calc.add(1, 2 is undefined.
  spy.mockRestore();
});

test('mockRestore returns original impl', () => {
  const spy = jest.spyOn(calc, 'add').mockReturnValue(99);
  spy.mockRestore(); // restores real add()
  // TODO: Assert that calc.add(1, 2 equals 3 using .toBe().
});
```
