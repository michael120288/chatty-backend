# Mock Return Object with Methods

**Level:** 254
**ID:** `jest-254`
**XP:** 130
**Tags:** `mock object`, `factory`, `nested mocks`

## Objective

Mock a function that returns an object with its own mockable methods.

## Story

The dungeon service returns an object with methods. Mock the whole thing.

## Hints
1. Mock the factory function with mockReturnValue pointing to the mock object.
2. The mock object has its own jest.fn() methods.
3. Verify each method call independently.

## Solution

```javascript
function createSession(userId) {
  return {
    userId,
    read: () => `data for ${userId}`,
    write: (data) => `wrote ${data} for ${userId}`,
    close: () => `session closed`,
  };
}

test('mock session object', () => {
  const mockSession = {
    userId: 1,
    read: jest.fn().mockReturnValue('mock data'),
    write: jest.fn().mockReturnValue('mock write ok'),
    close: jest.fn(),
  };
  const getSession = jest.fn().mockReturnValue(mockSession);

  const session = getSession(1);
  const data = session.read();
  session.write('test');
  session.close();
  expect(data).toBe('mock data');
  expect(session.write).toHaveBeenCalledWith('test');
  expect(session.close).toHaveBeenCalledTimes(1);
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
function createSession(userId) {
  return {
    userId,
    read: () => `data for ${userId}`,
    write: (data) => `wrote ${data} for ${userId}`,
    close: () => `session closed`,
  };
}

test('mock session object', () => {
  const mockSession = {
    userId: 1,
    read: jest.fn().mockReturnValue('mock data'),
    write: jest.fn().mockReturnValue('mock write ok'),
    close: jest.fn(),
  };
  const getSession = jest.fn().mockReturnValue(mockSession);

  const session = getSession(1);
  const data = session.read();
  session.write('test');
  session.close();

  // TODO: Assert that data equals 'mock data' using .toBe().
  // TODO: Assert that session.write was called with the expected arguments.
  // TODO: Assert that session.close was called exactly 1 times.
});
```
