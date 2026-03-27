# expect.any()

**Level:** 18
**ID:** `jest-18`
**XP:** 100
**Tags:** `expect.any`, `type-checking`, `matchers`

## Objective

Use expect.any() to assert value type without knowing the exact value.

## Story

The merchant's ID can be any number — you just need to confirm the type.

## Hints
1. expect.any(Constructor) — matches any value created by that constructor.
2. Works inside toEqual, toMatchObject etc.
3. expect.any(Number), expect.any(String), expect.any(Function) are common.

## Solution

```javascript
function createMerchant(name){return{name,id:Math.random()*1000,createdAt:new Date()};}
const merchant=createMerchant('Bob');
test('merchant id is a number',()=>{expect(merchant.id).toEqual(expect.any(Number));});
test('merchant createdAt is a Date',()=>{expect(merchant.createdAt).toEqual(expect.any(Date));});
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
function createMerchant(name) {
  return { name, id: Math.random() * 1000, createdAt: new Date() };
}

const merchant = createMerchant('Bob');

test('merchant id is a number', () => {
  // TODO: Assert that merchant.id deeply equals the expected value using .toEqual().
});

test('merchant createdAt is a Date', () => {
  // TODO: Assert that merchant.createdAt deeply equals the expected value using .toEqual().
});
```
