# Mock Return Values

**Level:** 9
**ID:** `jest-09`
**XP:** 200
**Tags:** `mockReturnValue`, `mockReturnValueOnce`, `mocks`

## Objective

Use mockReturnValueOnce to return different values on successive calls, then a default with mockReturnValue.

## Story

The oracle's prophecy changes with each question. Use mockReturnValueOnce to control what a mock returns on each call.

## Hints
1. mockReturnValueOnce(v) — returns v on the next call only.
2. mockReturnValue(v) — returns v as the default for all subsequent calls.
3. Chain them: oracle.mockReturnValueOnce('fire').mockReturnValueOnce('ice').mockReturnValue('unknown')

## Solution

```javascript
const oracle = jest.fn()
  .mockReturnValueOnce('fire')
  .mockReturnValueOnce('ice')
  .mockReturnValue('unknown');
test('first prophecy is fire', () => { expect(oracle()).toBe('fire'); });
test('second prophecy is ice', () => { expect(oracle()).toBe('ice'); });
test('all further prophecies are unknown', () => { expect(oracle()).toBe('unknown'); expect(oracle()).toBe('unknown'); });
```

## Explanation

`expect(value).toEqual(expected)` does a **deep equality** check — it compares object/array contents recursively, unlike `toBe` which uses `===`.

```
expect({ a: 1, b: [2, 3] }).toEqual({ a: 1, b: [2, 3] }); // passes
expect({ a: 1 }).toBe({ a: 1 });                           // FAILS (different object refs)
```

## Starter Code

```javascript
const oracle = jest.fn();

// TODO: chain .mockReturnValueOnce('fire') then .mockReturnValueOnce('ice') then .mockReturnValue('unknown')

test('first prophecy is fire', () => {
  expect(oracle()).toBe('fire');
});

test('second prophecy is ice', () => {
  expect(oracle()).toBe('ice');
});

test('all further prophecies are unknown', () => {
  expect(oracle()).toBe('unknown');
  expect(oracle()).toBe('unknown');
});
```
