# spyOn — Verify Side Effects

**Level:** 237
**ID:** `jest-237`
**XP:** 130
**Tags:** `spyOn`, `side effects`, `verify`

## Objective

Spy on a method to verify it was triggered by indirect code.

## Story

Check that the dungeon alarm was triggered exactly when expected — no more, no less.

## Hints
1. Spy on alarm.trigger to observe indirect calls from checkDungeon.
2. mockImplementation(() => {}) prevents the real alert from firing.
3. Test both the positive (breach) and negative (unknown) cases.

## Solution

```javascript
const alarm = {
  trigger(reason) { /* sends real alert */ }
};

function checkDungeon(status, alarmSystem) {
  if (status === 'breach') alarmSystem.trigger('breach detected');
  if (status === 'clear') alarmSystem.trigger('all clear');
}

test('alarm triggered on breach', () => {
  const spy = jest.spyOn(alarm, 'trigger').mockImplementation(() => {});
  checkDungeon('breach', alarm);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith('breach detected');
  spy.mockRestore();
});

test('alarm not triggered on unknown status', () => {
  const spy = jest.spyOn(alarm, 'trigger').mockImplementation(() => {});
  checkDungeon('unknown', alarm);
  expect(spy).not.toHaveBeenCalled();
  spy.mockRestore();
});
```

## Explanation

Complex mock setups with implementation per call:

```
const mockFn = jest.fn()
  .mockReturnValueOnce('first')   // first call returns 'first'
  .mockReturnValueOnce('second')  // second call returns 'second'
  .mockReturnValue('default');    // all subsequent calls

expect(mockFn()).toBe('first');
expect(mockFn()).toBe('second');
expect(mockFn()).toBe('default');
```

## Starter Code

```javascript
const alarm = {
  trigger(reason) { /* sends real alert */ }
};

function checkDungeon(status, alarmSystem) {
  if (status === 'breach') alarmSystem.trigger('breach detected');
  if (status === 'clear') alarmSystem.trigger('all clear');
}

test('alarm triggered on breach', () => {
  const spy = jest.spyOn(alarm, 'trigger').mockImplementation(() => {});
  checkDungeon('breach', alarm);
  // TODO: Assert that spy was called exactly 1 times.
  // TODO: Assert that spy was called with the expected arguments.
  spy.mockRestore();
});

test('alarm not triggered on unknown status', () => {
  const spy = jest.spyOn(alarm, 'trigger').mockImplementation(() => {});
  checkDungeon('unknown', alarm);
  // TODO: Assert that spy was not called.
  spy.mockRestore();
});
```
