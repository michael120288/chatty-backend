# test.each — Object Array

**Level:** 48
**ID:** `jest-48`
**XP:** 150
**Tags:** `test.each`, `objects`, `parameterized`

## Objective

Use test.each with an array of objects for named test parameters.

## Story

The merchant catalogue uses named fields. Use test.each with object rows.

## Hints
1. Object rows allow named parameters — use destructuring in callback.
2. $fieldName in the test name string is replaced with the value.
3. Much more readable than positional arrays for complex inputs.

## Solution

```javascript
function discount(p,pct){return p*(1-pct/100);}
test.each([{price:100,pct:10,expected:90},{price:200,pct:50,expected:100},{price:50,pct:0,expected:50}])('$price at $pct% discount is $expected',({price,pct,expected})=>{expect(discount(price,pct)).toBe(expected);});
```

## Explanation

`expect(array).toContain(item)` checks that an array includes a value (using `===`).
`expect(array).toContainEqual(obj)` does deep equality for objects in arrays.

```
expect([1, 2, 3]).toContain(2);
expect([{ name: 'Aria' }]).toContainEqual({ name: 'Aria' });
expect('Hello World').toContain('World'); // works on strings too
```

## Starter Code

```javascript
function discount(price, pct) {
  return price * (1 - pct / 100);
}

test.each([
  { price: 100, pct: 10, expected: 90 },
  { price: 200, pct: 50, expected: 100 },
  { price: 50,  pct: 0,  expected: 50  },
])('$price at $pct% discount is $expected', ({ price, pct, expected }) => {
  // TODO: Assert that discount(price, pct equals expected using .toBe().
});
```
