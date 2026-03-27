# expect.anything()

**Level:** 19
**ID:** `jest-19`
**XP:** 100
**Tags:** `expect.anything`, `null-check`, `matchers`

## Objective

Use expect.anything() to assert a value is not null or undefined.

## Story

You don't care what the oracle returns — only that it returned something.

## Hints
1. expect.anything() — matches anything except null and undefined.
2. Useful when the exact value is random but you need it to exist.
3. Combine with toMatchObject for partial object checks.

## Solution

```javascript
function getOracle(){return'mysterious answer';}
test('oracle returns something',()=>{expect(getOracle()).toEqual(expect.anything());});
test('oracle in object',()=>{const result={value:getOracle()};expect(result).toMatchObject({value:expect.anything()});});
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
function getOracle() {
  return 'mysterious answer';
}

test('oracle returns something', () => {
  // TODO: Assert that getOracle() deeply equals the expected value using .toEqual().
});

test('oracle in object', () => {
  const result = { value: getOracle() };
  // TODO: Assert that result matches the expected object shape using .toMatchObject().
});
```
