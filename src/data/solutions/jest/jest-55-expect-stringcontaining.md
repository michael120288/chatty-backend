# expect.stringContaining()

**Level:** 55
**ID:** `jest-55`
**XP:** 150
**Tags:** `stringContaining`, `strings`, `partial`

## Objective

Use expect.stringContaining() to do partial string matching.

## Story

The battle log must mention the hero's name — you don't care about the exact message.

## Hints
1. expect.stringContaining(str) — passes if the string includes str.
2. Works inside toEqual, toMatchObject etc.
3. Use expect.stringMatching(regex) for pattern matching.

## Solution

```javascript
function battleLog(n,o){return`[${new Date().toISOString()}] ${n}: ${o}`;}
test('log contains hero',()=>{const l=battleLog('Gandalf','victory');expect(l).toEqual(expect.stringContaining('Gandalf'));});
test('log contains outcome',()=>{const l=battleLog('Frodo','escaped');expect(l).toEqual(expect.stringContaining('escaped'));});
```

## Explanation

Timer mocks: `jest.useFakeTimers()` replaces `setTimeout`, `setInterval`, and `Date`.

```
jest.useFakeTimers();
const callback = jest.fn();
setTimeout(callback, 1000);

jest.advanceTimersByTime(999);
expect(callback).not.toHaveBeenCalled();

jest.advanceTimersByTime(1);
expect(callback).toHaveBeenCalledTimes(1);

jest.useRealTimers(); // restore after test
```

## Starter Code

```javascript
function battleLog(heroName, outcome) {
  return `[${new Date().toISOString()}] ${heroName}: ${outcome}`;
}

test('log contains hero name', () => {
  const log = battleLog('Gandalf', 'victory');
  // TODO: Assert that log deeply equals the expected value using .toEqual().
});

test('log contains outcome', () => {
  const log = battleLog('Frodo', 'escaped');
  // TODO: Assert that log deeply equals the expected value using .toEqual().
});
```
