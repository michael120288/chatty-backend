# mockReturnValueOnce — Sequence

**Level:** 227
**ID:** `jest-227`
**XP:** 110
**Tags:** `mockReturnValueOnce`, `sequence`, `fallback`

## Objective

Chain mockReturnValueOnce calls with a mockReturnValue fallback.

## Story

The dice roll must produce a specific sequence: 1, 6, 3, then fall back to 0.

## Hints
1. One-shots are consumed in order before the permanent fallback.
2. Chain as many mockReturnValueOnce as needed.
3. After one-shots are exhausted, mockReturnValue takes over.

## Solution

```javascript
test('sequential return values', () => {
  const roll = jest.fn()
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(6)
    .mockReturnValueOnce(3)
    .mockReturnValue(0); // fallback
  expect(roll()).toBe(1);
  expect(roll()).toBe(6);
  expect(roll()).toBe(3);
  expect(roll()).toBe(0); // fallback
  expect(roll()).toBe(0); // still fallback
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
test('sequential return values', () => {
  const roll = jest.fn()
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(6)
    .mockReturnValueOnce(3)
    .mockReturnValue(0); // fallback
  // TODO: Assert that roll() equals 1 using .toBe().
  // TODO: Assert that roll() equals 6 using .toBe().
  // TODO: Assert that roll() equals 3 using .toBe().
  // TODO: Assert that roll() equals 0 using .toBe().
});
```
