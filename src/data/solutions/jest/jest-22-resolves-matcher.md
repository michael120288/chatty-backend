# .resolves Matcher

**Level:** 22
**ID:** `jest-22`
**XP:** 100
**Tags:** `resolves`, `promises`, `async`

## Objective

Use .resolves to assert on a fulfilled Promise value.

## Story

The fortress gate should unlock. Use .resolves to unwrap the promise inline.

## Hints
1. await expect(promise).resolves.toBe(value) — unwraps and asserts.
2. Must await or return the assertion.
3. Works with any matcher: .resolves.toEqual(), .resolves.toBeTruthy() etc.

## Solution

```javascript
function unlockGate(){return Promise.resolve('gate open');}
test('gate unlocks',async()=>{await expect(unlockGate()).resolves.toBe('gate open');});
```

## Explanation

`jest.spyOn(object, 'methodName')` wraps an existing method to track calls while keeping the original implementation.

```
const spy = jest.spyOn(console, 'log');
console.log('hello');
expect(spy).toHaveBeenCalledWith('hello');
spy.mockRestore(); // restore original
```

Use `spy.mockImplementation(fn)` to change the behaviour, or `spy.mockReturnValue(val)` to stub the return.

## Starter Code

```javascript
function unlockGate() {
  return Promise.resolve('gate open');
}

test('gate unlocks', async () => {
  // TODO: Assert that unlockGate() equals 'gate open' using .toBe().
});
```
