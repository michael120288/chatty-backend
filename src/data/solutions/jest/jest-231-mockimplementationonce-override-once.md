# mockImplementationOnce — Override Once

**Level:** 231
**ID:** `jest-231`
**XP:** 120
**Tags:** `mockImplementationOnce`, `jest.fn`, `override`

## Objective

Use mockImplementationOnce to change behaviour for a single call.

## Story

The oracle normally tells truth, but lies once. Override the implementation for one call.

## Hints
1. mockImplementationOnce is consumed on the first call.
2. After the one-shot, the permanent mockImplementation takes over.
3. Chain multiple mockImplementationOnce for multi-step sequences.

## Solution

```javascript
test('one-shot implementation', () => {
  const predict = jest.fn()
    .mockImplementationOnce(() => 'lie')
    .mockImplementation(() => 'truth');
  expect(predict()).toBe('lie'); // one-shot
  expect(predict()).toBe('truth'); // back to default
  expect(predict()).toBe('truth'); // still default
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
test('one-shot implementation', () => {
  const predict = jest.fn()
    .mockImplementationOnce(() => 'lie')
    .mockImplementation(() => 'truth');
  // TODO: Assert that predict() equals 'lie' using .toBe().
  // TODO: Assert that predict() equals 'truth' using .toBe().
});
```
