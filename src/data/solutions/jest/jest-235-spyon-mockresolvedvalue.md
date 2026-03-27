# spyOn — mockResolvedValue

**Level:** 235
**ID:** `jest-235`
**XP:** 120
**Tags:** `spyOn`, `mockResolvedValue`, `async`

## Objective

Use jest.spyOn with mockResolvedValue on an async method.

## Story

The async scout always finds treasure when spied on. Mock the async resolution.

## Hints
1. spyOn + mockResolvedValue replaces async methods cleanly.
2. await the result as normal.
3. Verify the argument was passed correctly.

## Solution

```javascript
const scout = {
  async search(area) {
    // real impl would call an API
    return null;
  }
};

test('spy async method', async () => {
  const spy = jest.spyOn(scout, 'search').mockResolvedValue({ found: 'treasure' });
  const result = await scout.search('north');
  expect(result).toEqual({ found: 'treasure' });
  expect(spy).toHaveBeenCalledWith('north');
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
const scout = {
  async search(area) {
    // real impl would call an API
    return null;
  }
};

test('spy async method', async () => {
  const spy = jest.spyOn(scout, 'search').mockResolvedValue({ found: 'treasure' });
  const result = await scout.search('north');
  // TODO: Assert that result deeply equals the expected value using .toEqual().
  // TODO: Assert that spy was called with the expected arguments.
  spy.mockRestore();
});
```
