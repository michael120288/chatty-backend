# toBeFinite — check with not

**Level:** 116
**ID:** `jest-116`
**XP:** 100
**Tags:** `not`, `toBeNaN`, `toBeNull`

## Objective

Use not.toBeNaN() and explicit checks for finite values.

## Story

Division by zero also produces Infinity. Verify that valid results are finite.

## Hints
1. Combine not.toBeNull() and not.toBeNaN() to verify a valid numeric result.
2. toBe(5) handles the exact value check.
3. Guard clauses return null instead of NaN/Infinity.

## Solution

```javascript
function safeDivide(a,b){if(b===0)return null;return a/b;}
test('safe divide returns finite number',()=>{const r=safeDivide(10,2);expect(r).not.toBeNull();expect(r).toBe(5);expect(r).not.toBeNaN();});
test('divide by zero returns null',()=>{expect(safeDivide(5,0)).toBeNull();});
```

## Explanation

`jest.mock` with `__mocks__` folder: place a file at `__mocks__/moduleName.js` to auto-mock across all tests.

```
// __mocks__/@services/api/game/game.service.js
export const gameService = {
  getLevels: jest.fn(),
  getLevel: jest.fn(),
};
```

In tests: `jest.mock('@services/api/game/game.service')` will use your manual mock automatically.

## Starter Code

```javascript
function safeDivide(a, b) {
  if (b === 0) return null;
  return a / b;
}

test('safe divide returns finite number', () => {
  const result = safeDivide(10, 2);
  // TODO: Assert that result is not null.
  // TODO: Assert that result equals 5 using .toBe().
  // TODO: Assert that result is NaN.
});

test('divide by zero returns null', () => {
  // TODO: Assert that safeDivide(5, 0 is null.
});
```
