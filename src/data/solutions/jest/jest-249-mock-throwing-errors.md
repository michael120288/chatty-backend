# Mock Throwing Errors

**Level:** 249
**ID:** `jest-249`
**XP:** 130
**Tags:** `mock`, `throw`, `error`, `mockImplementation`

## Objective

Use mockImplementation to make a mock throw an error.

## Story

The cursed sword always throws when swung. Make the mock throw.

## Hints
1. mockImplementation(() => { throw ... }) makes the mock throw.
2. toThrow checks the error is raised.
3. Combine with mockReturnValue for throw-then-succeed patterns.

## Solution

```javascript
test('mock that throws', () => {
  const swingSword = jest.fn().mockImplementation(() => {
    throw new Error('Cursed blade — cannot swing');
  });
  expect(() => swingSword()).toThrow('Cursed blade — cannot swing');
  expect(swingSword).toHaveBeenCalledTimes(1);
});

test('mock throw then succeed', () => {
  const swing = jest.fn()
    .mockImplementationOnce(() => { throw new Error('miss'); })
    .mockReturnValue('hit');
  expect(() => swing()).toThrow('miss');
  expect(swing()).toBe('hit');
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
test('mock that throws', () => {
  const swingSword = jest.fn().mockImplementation(() => {
    throw new Error('Cursed blade — cannot swing');
  });
  // TODO: Assert that the function throws the expected error using .toThrow().
  // TODO: Assert that swingSword was called exactly 1 times.
});

test('mock throw then succeed', () => {
  const swing = jest.fn()
    .mockImplementationOnce(() => { throw new Error('miss'); })
    .mockReturnValue('hit');
  // TODO: Assert that the function throws the expected error using .toThrow().
  // TODO: Assert that swing() equals 'hit' using .toBe().
});
```
