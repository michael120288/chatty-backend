# expect.arrayContaining()

**Level:** 20
**ID:** `jest-20`
**XP:** 100
**Tags:** `arrayContaining`, `arrays`, `subset`

## Objective

Use expect.arrayContaining to assert an array includes certain elements.

## Story

The supply crate must include the essentials — you don't care about extra items.

## Hints
1. expect.arrayContaining([...]) — matches if all listed items are present.
2. Order does not matter — it only checks membership.
3. Extra items in the array are ignored.

## Solution

```javascript
const crate=['sword','shield','potion','map','rope'];
test('crate has essentials',()=>{expect(crate).toEqual(expect.arrayContaining(['sword','potion']));});
test('sorted order does not matter',()=>{const s=['map','rope','shield','sword','potion'];expect(s).toEqual(expect.arrayContaining(['sword','potion']));});
```

## Explanation

Jest mock functions (`jest.fn()`) track calls, arguments, and return values.

```
const mockAdd = jest.fn((a, b) => a + b);
mockAdd(2, 3);
expect(mockAdd).toHaveBeenCalledTimes(1);
expect(mockAdd).toHaveBeenCalledWith(2, 3);
expect(mockAdd).toHaveReturnedWith(5);
```

Reset between tests: `mockFn.mockClear()` (clears call history) or `mockFn.mockReset()` (also resets implementation).

## Starter Code

```javascript
const crate = ['sword', 'shield', 'potion', 'map', 'rope'];

test('crate has essentials', () => {
  // TODO: Assert that crate deeply equals the expected value using .toEqual().
});

test('sorted order does not matter', () => {
  const sorted = ['map', 'rope', 'shield', 'sword', 'potion'];
  // TODO: Assert that sorted deeply equals the expected value using .toEqual().
});
```
