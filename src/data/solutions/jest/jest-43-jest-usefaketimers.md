# jest.useFakeTimers()

**Level:** 43
**ID:** `jest-43`
**XP:** 150
**Tags:** `useFakeTimers`, `runAllTimers`, `setTimeout`

## Objective

Use jest.useFakeTimers() and jest.runAllTimers() to test setTimeout.

## Story

The time mage can freeze the clock. Replace real timers with fakes to test setTimeout.

## Hints
1. jest.useFakeTimers() replaces setTimeout, setInterval etc. with fakes.
2. jest.runAllTimers() fires all pending timers immediately.
3. Always call before the test code that uses timers.

## Solution

```javascript
jest.useFakeTimers();
function delayedAlert(cb){setTimeout(()=>cb('alert!'),3000);}
test('callback fires after timeout',()=>{const cb=jest.fn();delayedAlert(cb);expect(cb).not.toHaveBeenCalled();jest.runAllTimers();expect(cb).toHaveBeenCalledWith('alert!');});
```

## Explanation

`expect(value).toMatchObject(partial)` checks that an object **contains** the expected subset — extra properties are ignored.

```
const user = { id: 1, name: 'Aria', role: 'Mage', level: 99 };
expect(user).toMatchObject({ name: 'Aria', role: 'Mage' }); // passes
```

`toMatchSnapshot()` captures the value on first run and compares on subsequent runs.

## Starter Code

```javascript
jest.useFakeTimers();

function delayedAlert(callback) {
  setTimeout(() => callback('alert!'), 3000);
}

test('callback fires after timeout', () => {
  const cb = jest.fn();
  delayedAlert(cb);

  expect(cb).not.toHaveBeenCalled();

  // TODO: Advance all fake timers to trigger pending callbacks.
  // TODO: Assert that cb was called with the expected arguments.
});
```
