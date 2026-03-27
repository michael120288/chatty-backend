# Instance Checking

**Level:** 17
**ID:** `jest-17`
**XP:** 100
**Tags:** `toBeInstanceOf`, `classes`, `instanceof`

## Objective

Use toBeInstanceOf to verify class instances.

## Story

The potion must be a real Potion instance, not a fake. Use toBeInstanceOf.

## Hints
1. toBeInstanceOf(Class) — uses instanceof check.
2. All class instances are also instanceof Object.
3. Useful for checking Error types: toBeInstanceOf(TypeError).

## Solution

```javascript
class Potion{constructor(type){this.type=type;}}
const healthPotion=new Potion('health');
test('healthPotion is a Potion',()=>{expect(healthPotion).toBeInstanceOf(Potion);});
test('healthPotion is an Object',()=>{expect(healthPotion).toBeInstanceOf(Object);});
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
class Potion {
  constructor(type) { this.type = type; }
}

const healthPotion = new Potion('health');

test('healthPotion is a Potion', () => {
  // TODO: Assert that healthPotion is an instance of Potion.
});

test('healthPotion is an Object', () => {
  // TODO: Assert that healthPotion is an instance of Object.
});
```
