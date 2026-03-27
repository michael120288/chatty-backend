# advanceTimersByTime

**Level:** 44
**ID:** `jest-44`
**XP:** 150
**Tags:** `advanceTimersByTime`, `timers`, `fakeTimers`

## Objective

Use jest.advanceTimersByTime(ms) to advance the clock by a specific amount.

## Story

The hourglass advances precisely. Use advanceTimersByTime to control exactly when callbacks fire.

## Hints
1. jest.advanceTimersByTime(ms) moves the fake clock forward by ms milliseconds.
2. Only timers scheduled within that window will fire.
3. Call it multiple times to simulate time passing in steps.

## Solution

```javascript
jest.useFakeTimers();
function scheduleEvent(cb,ms){setTimeout(cb,ms);}
test('event fires at 1000ms',()=>{const cb=jest.fn();scheduleEvent(cb,1000);jest.advanceTimersByTime(500);expect(cb).not.toHaveBeenCalled();jest.advanceTimersByTime(500);expect(cb).toHaveBeenCalledTimes(1);});
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

function scheduleEvent(cb, ms) {
  setTimeout(cb, ms);
}

test('event fires at 1000ms but not before', () => {
  const cb = jest.fn();
  scheduleEvent(cb, 1000);

  jest.advanceTimersByTime(500);
  // TODO: Assert that cb was not called.

  jest.advanceTimersByTime(500);
  // TODO: Assert that cb was called exactly 1 times.
});
```
