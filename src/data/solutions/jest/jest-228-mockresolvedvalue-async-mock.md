# mockResolvedValue — Async Mock

**Level:** 228
**ID:** `jest-228`
**XP:** 110
**Tags:** `mockResolvedValue`, `async`, `jest.fn`

## Objective

Use mockResolvedValue to return a resolved promise.

## Story

The async dungeon door always opens successfully. Mock the async call.

## Hints
1. mockResolvedValue(val) is shorthand for mockImplementation(() => Promise.resolve(val)).
2. Use await to get the resolved value.
3. Works in both async/await and .then() style.

## Solution

```javascript
test('async mock resolved', async () => {
  const fetchGold = jest.fn().mockResolvedValue({ amount: 500, currency: 'GP' });
  const result = await fetchGold();
  expect(result).toEqual({ amount: 500, currency: 'GP' });
  expect(fetchGold).toHaveBeenCalledTimes(1);
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
test('async mock resolved', async () => {
  const fetchGold = jest.fn().mockResolvedValue({ amount: 500, currency: 'GP' });
  const result = await fetchGold();
  // TODO: Assert that result deeply equals the expected value using .toEqual().
  // TODO: Assert that fetchGold was called exactly 1 times.
});
```
