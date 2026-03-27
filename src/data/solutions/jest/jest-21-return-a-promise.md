# Return a Promise

**Level:** 21
**ID:** `jest-21`
**XP:** 100
**Tags:** `promises`, `async`, `return`

## Objective

Return a Promise directly from a test (without async/await).

## Story

The scout sends a Promise dispatch. Return it from your test so Jest awaits it.

## Hints
1. Return the promise from the test — Jest waits for it.
2. If you forget to return, Jest finishes before the promise resolves.
3. Use .then() to assert on the resolved value.

## Solution

```javascript
function scoutReport(){return new Promise(r=>setTimeout(()=>r('all clear'),10));}
test('scout returns all clear',()=>{return scoutReport().then(msg=>expect(msg).toBe('all clear'));});
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
function scoutReport() {
  return new Promise(resolve => setTimeout(() => resolve('all clear'), 10));
}

test('scout returns all clear', () => {
  // TODO: Assert that msg equals 'all clear') using .toBe().
});
```
