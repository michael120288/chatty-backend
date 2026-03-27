# .rejects Matcher

**Level:** 23
**ID:** `jest-23`
**XP:** 100
**Tags:** `rejects`, `promises`, `errors`

## Objective

Use .rejects to assert a Promise rejects with the expected error.

## Story

The forbidden spell must fail when cast. Use .rejects to verify the rejection.

## Hints
1. await expect(promise).rejects.toThrow(msg) — asserts rejection.
2. Must await or return the assertion or the test passes vacuously.
3. Can also use .rejects.toBeInstanceOf(Error).

## Solution

```javascript
function castForbiddenSpell(){return Promise.reject(new Error('spell forbidden'));}
test('forbidden spell rejects',async()=>{await expect(castForbiddenSpell()).rejects.toThrow('spell forbidden');});
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
function castForbiddenSpell() {
  return Promise.reject(new Error('spell forbidden'));
}

test('forbidden spell rejects', async () => {
  // TODO: Assert that the function throws the expected error.
});
```
