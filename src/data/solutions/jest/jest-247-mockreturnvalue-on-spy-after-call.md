# mockReturnValue on Spy After Call

**Level:** 247
**ID:** `jest-247`
**XP:** 130
**Tags:** `spyOn`, `mockReturnValue`, `sequence`

## Objective

Call a spy once with real impl, then override it with mockReturnValue.

## Story

The oracle spoke the truth once. Now make it lie forever after.

## Hints
1. Before mockReturnValue, the real impl runs.
2. After mockReturnValue, the mock takes over permanently.
3. Total calls = 1 real + 2 mocked = 3.

## Solution

```javascript
const oracle = { read: () => 'truth' };

test('real then mock', () => {
  const spy = jest.spyOn(oracle, 'read');
  // First call: real implementation
  expect(oracle.read()).toBe('truth');
  // Now override
  spy.mockReturnValue('lie');
  expect(oracle.read()).toBe('lie');
  expect(oracle.read()).toBe('lie');
  expect(spy).toHaveBeenCalledTimes(3);
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
const oracle = { read: () => 'truth' };

test('real then mock', () => {
  const spy = jest.spyOn(oracle, 'read');
  // First call: real implementation
  // TODO: Assert that oracle.read( equals 'truth' using .toBe().
  // Now override
  spy.mockReturnValue('lie');
  // TODO: Assert that oracle.read( equals 'lie' using .toBe().
  // TODO: Assert that spy was called exactly 3 times.
  spy.mockRestore();
});
```
