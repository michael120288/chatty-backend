# expect.assertions()

**Level:** 24
**ID:** `jest-24`
**XP:** 150
**Tags:** `expect.assertions`, `callbacks`, `async`

## Objective

Use expect.assertions(n) to guarantee async assertions execute.

## Story

A secret message arrives via callback. Declare the assertion count upfront to ensure it runs.

## Hints
1. expect.assertions(1) — fails if not exactly 1 assertion runs.
2. Protects against tests passing when the callback never fires.
3. Place it at the top of the test.

## Solution

```javascript
function deliverMessage(cb){setTimeout(()=>cb(null,'secret scroll'),10);}
test('message is delivered',done=>{expect.assertions(1);deliverMessage((err,msg)=>{expect(msg).toBe('secret scroll');done();});});
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
function deliverMessage(callback) {
  setTimeout(() => callback(null, 'secret scroll'), 10);
}

test('message is delivered', done => {
  expect.assertions(1);
  deliverMessage((err, msg) => {
    // TODO: Assert that msg equals 'secret scroll' using .toBe().
    done();
  });
});
```
