# mockImplementation Async

**Level:** 232
**ID:** `jest-232`
**XP:** 120
**Tags:** `mockImplementation`, `async`, `conditional`

## Objective

Use async mockImplementation that conditionally resolves or rejects.

## Story

The dungeon portal behaves differently on each attempt. Use async mock logic.

## Hints
1. async mockImplementation can throw or resolve conditionally.
2. The closure over attempt tracks state between calls.
3. Count: 2 rejects + 1 resolve = 3 total calls.

## Solution

```javascript
test('conditional async mock', async () => {
  let attempt = 0;
  const connect = jest.fn().mockImplementation(async () => {
    attempt++;
    if (attempt < 3) throw new Error('Connection refused');
    return { connected: true };
  });
  await expect(connect()).rejects.toThrow('Connection refused');
  await expect(connect()).rejects.toThrow('Connection refused');
  const result = await connect();
  expect(result).toEqual({ connected: true });
  expect(connect).toHaveBeenCalledTimes(3);
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
test('conditional async mock', async () => {
  let attempt = 0;
  const connect = jest.fn().mockImplementation(async () => {
    attempt++;
    if (attempt < 3) throw new Error('Connection refused');
    return { connected: true };
  });
  await expect(connect()).rejects.toThrow('Connection refused');
  await expect(connect()).rejects.toThrow('Connection refused');
  const result = await connect();
  // TODO: Assert that result deeply equals the expected value using .toEqual().
  // TODO: Assert that connect was called exactly 3 times.
});
```
