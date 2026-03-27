# Spy on Promise.resolve

**Level:** 253
**ID:** `jest-253`
**XP:** 130
**Tags:** `spyOn`, `async`, `mockResolvedValueOnce`

## Objective

Spy on a method that returns a promise and verify async behavior.

## Story

Track every promise resolution in the dungeon network layer.

## Hints
1. mockResolvedValueOnce overrides the async result for one call.
2. Await the result and assert on the data.
3. spy.mockRestore() restores the real async implementation.

## Solution

```javascript
const network = {
  async fetch(url) {
    return { url, data: null }; // real impl
  }
};

test('spy on async fetch', async () => {
  const spy = jest.spyOn(network, 'fetch').mockResolvedValueOnce({ url: '/heroes', data: [1, 2, 3] });
  const result = await network.fetch('/heroes');
  expect(result.data).toEqual([1, 2, 3]);
  expect(spy).toHaveBeenCalledWith('/heroes');
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
const network = {
  async fetch(url) {
    return { url, data: null }; // real impl
  }
};

test('spy on async fetch', async () => {
  const spy = jest.spyOn(network, 'fetch').mockResolvedValueOnce({ url: '/heroes', data: [1, 2, 3] });
  const result = await network.fetch('/heroes');
  // TODO: Assert that result.data deeply equals the expected value using .toEqual().
  // TODO: Assert that spy was called with the expected arguments.
  spy.mockRestore();
});
```
