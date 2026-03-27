# mockRejectedValue — Async Error

**Level:** 229
**ID:** `jest-229`
**XP:** 110
**Tags:** `mockRejectedValue`, `async`, `rejects`

## Objective

Use mockRejectedValue to return a rejected promise.

## Story

The cursed portal always fails. Mock the rejection.

## Hints
1. mockRejectedValue(err) wraps the error in Promise.reject.
2. Use rejects.toThrow() or rejects.toEqual() to assert.
3. Pair with expect.assertions() for safety in try/catch style.

## Solution

```javascript
test('async mock rejected', async () => {
  const openPortal = jest.fn().mockRejectedValue(new Error('Portal cursed'));
  await expect(openPortal()).rejects.toThrow('Portal cursed');
  expect(openPortal).toHaveBeenCalledTimes(1);
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
test('async mock rejected', async () => {
  const openPortal = jest.fn().mockRejectedValue(new Error('Portal cursed'));
  // TODO: Assert that the function throws the expected error.
  // TODO: Assert that openPortal was called exactly 1 times.
});
```
