# mockImplementationOnce

**Level:** 53
**ID:** `jest-53`
**XP:** 150
**Tags:** `mockImplementationOnce`, `jest.fn`, `sequence`

## Objective

Use mockImplementationOnce to return different results for the first call only.

## Story

The shape-shifter only transforms once, then reverts to normal form.

## Hints
1. Chain .mockImplementationOnce(fn) before .mockImplementation(fn).
2. Once-values are consumed first, then the default kicks in.
3. You can chain multiple mockImplementationOnce for a sequence.

## Solution

```javascript
const transform=jest.fn().mockImplementationOnce(()=>'dragon').mockImplementation(()=>'normal');
test('first call dragon',()=>{expect(transform()).toBe('dragon');});
test('subsequent normal',()=>{expect(transform()).toBe('normal');expect(transform()).toBe('normal');});
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
const transform = jest.fn().mockImplementation(() => 'normal');

// TODO: add mockImplementationOnce(() => 'dragon') before the tests

test('first call transforms to dragon', () => {
  expect(transform()).toBe('dragon');
});

test('subsequent calls are normal', () => {
  expect(transform()).toBe('normal');
  expect(transform()).toBe('normal');
});
```
