# Capture Arguments with mock.calls

**Level:** 248
**ID:** `jest-248`
**XP:** 130
**Tags:** `mock.calls`, `capture`, `args`

## Objective

Use mock.calls to capture and assert on all invocation arguments.

## Story

Extract and verify the exact arguments from every mock invocation.

## Hints
1. mock.calls is an array of arrays: [[arg1], [arg1], ...].
2. call[0] is the first argument (the object in this case).
3. Map over mock.calls to extract specific fields.

## Solution

```javascript
test('capture all args', () => {
  const save = jest.fn();
  save({ id: 1, name: 'Alice' });
  save({ id: 2, name: 'Bob' });
  save({ id: 3, name: 'Carol' });

  const savedNames = save.mock.calls.map(call => call[0].name);
  expect(savedNames).toEqual(['Alice', 'Bob', 'Carol']);

  const ids = save.mock.calls.map(call => call[0].id);
  expect(ids).toEqual([1, 2, 3]);
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
test('capture all args', () => {
  const save = jest.fn();
  save({ id: 1, name: 'Alice' });
  save({ id: 2, name: 'Bob' });
  save({ id: 3, name: 'Carol' });

  const savedNames = save.mock.calls.map(call => call[0].name);
  // TODO: Assert that savedNames deeply equals the expected value using .toEqual().

  const ids = save.mock.calls.map(call => call[0].id);
  // TODO: Assert that ids deeply equals the expected value using .toEqual().
});
```
