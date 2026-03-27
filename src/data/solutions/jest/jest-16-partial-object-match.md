# Partial Object Match

**Level:** 16
**ID:** `jest-16`
**XP:** 100
**Tags:** `toMatchObject`, `partial`, `objects`

## Objective

Use toMatchObject to do partial object matching.

## Story

The treasure chest contains many items. You only care that it has the gold — use toMatchObject.

## Hints
1. toMatchObject checks that the object contains the expected properties.
2. Extra properties in the received object are ignored.
3. Use toEqual for exact matching with no extra properties.

## Solution

```javascript
const treasure={gold:100,silver:50,gems:3,cursed:false};
test('treasure has gold',()=>{expect(treasure).toMatchObject({gold:100});});
test('treasure has gold and gems',()=>{expect(treasure).toMatchObject({gold:100,gems:3});});
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
const treasure = { gold: 100, silver: 50, gems: 3, cursed: false };

test('treasure has gold', () => {
  // TODO: Assert that treasure matches the expected object shape using .toMatchObject().
});

test('treasure has gold and gems', () => {
  // TODO: Assert that treasure matches the expected object shape using .toMatchObject().
});
```
