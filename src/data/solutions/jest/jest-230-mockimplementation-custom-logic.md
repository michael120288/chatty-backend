# mockImplementation — Custom Logic

**Level:** 230
**ID:** `jest-230`
**XP:** 120
**Tags:** `mockImplementation`, `jest.fn`, `logic`

## Objective

Use mockImplementation to define complex mock behaviour.

## Story

The shop prices items based on rarity. Use mockImplementation for conditional logic.

## Hints
1. mockImplementation takes a function that runs on each call.
2. The function receives the same arguments as the mock.
3. More flexible than mockReturnValue — can use conditionals.

## Solution

```javascript
test('mock with logic', () => {
  const getPrice = jest.fn().mockImplementation((item) => {
    const prices = { sword: 100, shield: 75, potion: 25 };
    return prices[item] ?? 0;
  });
  expect(getPrice('sword')).toBe(100);
  expect(getPrice('potion')).toBe(25);
  expect(getPrice('unknown')).toBe(0);
  expect(getPrice).toHaveBeenCalledTimes(3);
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
test('mock with logic', () => {
  const getPrice = jest.fn().mockImplementation((item) => {
    const prices = { sword: 100, shield: 75, potion: 25 };
    return prices[item] ?? 0;
  });
  // TODO: Assert that getPrice('sword' equals 100 using .toBe().
  // TODO: Assert that getPrice('potion' equals 25 using .toBe().
  // TODO: Assert that getPrice('unknown' equals 0 using .toBe().
  // TODO: Assert that getPrice was called exactly 3 times.
});
```
