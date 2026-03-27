# mock.results — Inspecting Return Values

**Level:** 224
**ID:** `jest-224`
**XP:** 110
**Tags:** `mock.results`, `jest.fn`, `inspect`

## Objective

Use mock.results to check the return values of each call.

## Story

The oracle's prophecies are logged for review. Inspect what the mock returned.

## Hints
1. mock.results is an array of { type, value } objects.
2. type is "return", "throw", or "incomplete".
3. mock.results[0].value gives the returned value of the first call.

## Solution

```javascript
test('inspect mock.results', () => {
  const roll = jest.fn()
    .mockReturnValueOnce(6)
    .mockReturnValueOnce(3)
    .mockReturnValueOnce(1);
  roll(); roll(); roll();
  expect(roll.mock.results[0].value).toBe(6);
  expect(roll.mock.results[1].value).toBe(3);
  expect(roll.mock.results[2].value).toBe(1);
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
test('inspect mock.results', () => {
  const roll = jest.fn()
    .mockReturnValueOnce(6)
    .mockReturnValueOnce(3)
    .mockReturnValueOnce(1);
  roll(); roll(); roll();
  // TODO: Assert that roll.mock.results[0].value equals 6 using .toBe().
  // TODO: Assert that roll.mock.results[1].value equals 3 using .toBe().
  // TODO: Assert that roll.mock.results[2].value equals 1 using .toBe().
});
```
