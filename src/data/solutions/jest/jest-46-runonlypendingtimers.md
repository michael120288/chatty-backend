# runOnlyPendingTimers

**Level:** 46
**ID:** `jest-46`
**XP:** 150
**Tags:** `runOnlyPendingTimers`, `timers`, `cascade`

## Objective

Use jest.runOnlyPendingTimers() to fire only currently pending timers.

## Story

Only fire the timers already scheduled — not new ones they trigger.

## Hints
1. runOnlyPendingTimers() fires currently queued timers but not new ones they schedule.
2. Call it again to fire the next batch.
3. Compare to runAllTimers which fires everything recursively.

## Solution

```javascript
jest.useFakeTimers();
const calls=[];
function cascade(){setTimeout(()=>{calls.push('first');setTimeout(()=>calls.push('second'),100);},100);}
test('runOnlyPendingTimers',()=>{cascade();jest.runOnlyPendingTimers();expect(calls).toEqual(['first']);jest.runOnlyPendingTimers();expect(calls).toEqual(['first','second']);});
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
jest.useFakeTimers();

const calls = [];

function cascade() {
  setTimeout(() => {
    calls.push('first');
    setTimeout(() => calls.push('second'), 100);
  }, 100);
}

test('runOnlyPendingTimers fires first but not second', () => {
  cascade();

  // TODO: Assert the expected outcome using expect(the result).
  // TODO: Assert that calls deeply equals the expected value using .toEqual().
  // TODO: Assert the expected outcome using expect(the result).
  // TODO: Assert that calls deeply equals the expected value using .toEqual().
});
```
