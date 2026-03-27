# spyOn — Replace with Mock

**Level:** 234
**ID:** `jest-234`
**XP:** 120
**Tags:** `spyOn`, `mockReturnValue`, `replace`

## Objective

Use jest.spyOn to replace a method and control the return value.

## Story

Swap the oracle's real answer with a controlled one using spyOn + mockReturnValue.

## Hints
1. Chain .mockReturnValue() directly on jest.spyOn().
2. The real Math.random is never called.
3. mockRestore() returns oracle.predict to its original randomness.

## Solution

```javascript
const oracle = {
  predict() { return Math.random() > 0.5 ? 'yes' : 'no'; }
};

test('controlled prediction', () => {
  const spy = jest.spyOn(oracle, 'predict').mockReturnValue('yes');
  expect(oracle.predict()).toBe('yes');
  expect(oracle.predict()).toBe('yes');
  expect(spy).toHaveBeenCalledTimes(2);
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
const oracle = {
  predict() { return Math.random() > 0.5 ? 'yes' : 'no'; }
};

test('controlled prediction', () => {
  const spy = jest.spyOn(oracle, 'predict').mockReturnValue('yes');
  // TODO: Assert that oracle.predict( equals 'yes' using .toBe().
  // TODO: Assert that spy was called exactly 2 times.
  spy.mockRestore();
});
```
