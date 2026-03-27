# setInterval with Fake Timers

**Level:** 45
**ID:** `jest-45`
**XP:** 150
**Tags:** `setInterval`, `fakeTimers`, `interval`

## Objective

Use jest.useFakeTimers and advance time to test setInterval.

## Story

The siege cannon fires every 500ms. Test the interval fires repeatedly.

## Hints
1. setInterval fires every N ms — advancing 1500ms with 500ms interval = 3 fires.
2. jest.advanceTimersByTime fires all timers that fall within that window.
3. Check both call count and arguments.

## Solution

```javascript
jest.useFakeTimers();
function startCannon(cb){return setInterval(()=>cb('BOOM'),500);}
test('cannon fires 3 times',()=>{const cb=jest.fn();startCannon(cb);jest.advanceTimersByTime(1500);expect(cb).toHaveBeenCalledTimes(3);expect(cb).toHaveBeenCalledWith('BOOM');});
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

function startCannon(callback) {
  return setInterval(() => callback('BOOM'), 500);
}

test('cannon fires 3 times in 1500ms', () => {
  const cb = jest.fn();
  startCannon(cb);

  jest.advanceTimersByTime(1500);

  // TODO: Assert that cb was called exactly 3 times.
  // TODO: Assert that cb was called with the expected arguments.
});
```
