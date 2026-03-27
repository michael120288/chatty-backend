# mock.instances — Tracking new

**Level:** 225
**ID:** `jest-225`
**XP:** 120
**Tags:** `mock.instances`, `constructor`, `jest.fn`

## Objective

Use mock.instances to verify constructor invocations.

## Story

The factory spawned three heroes. Verify the mock constructor was called three times.

## Hints
1. jest.fn() as a constructor tracks new calls via mock.instances.
2. mock.instances[n] is the instance created on the nth new call.
3. mock.calls still records constructor arguments.

## Solution

```javascript
const Hero = jest.fn(function(name) { this.name = name; });

test('constructor calls', () => {
  new Hero('Alice');
  new Hero('Bob');
  new Hero('Carol');
  expect(Hero).toHaveBeenCalledTimes(3);
  expect(Hero.mock.instances).toHaveLength(3);
  expect(Hero.mock.calls[0]).toEqual(['Alice']);
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
const Hero = jest.fn(function(name) { this.name = name; });

test('constructor calls', () => {
  new Hero('Alice');
  new Hero('Bob');
  new Hero('Carol');
  // TODO: Assert that Hero was called exactly 3 times.
  // TODO: Assert that Hero.mock.instances has length 3.
  // TODO: Assert that Hero.mock.calls[0] deeply equals the expected value using .toEqual().
});
```
