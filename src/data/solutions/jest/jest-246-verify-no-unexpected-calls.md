# Verify No Unexpected Calls

**Level:** 246
**ID:** `jest-246`
**XP:** 120
**Tags:** `not.toHaveBeenCalled`, `verify`, `side effects`

## Objective

Assert that specific mock methods were NOT called during a flow.

## Story

The healer must never call the attack method. Verify mock silence.

## Hints
1. not.toHaveBeenCalled() is just as important as toHaveBeenCalled().
2. Verify both what WAS called and what WASN'T.
3. This prevents accidental side effects in production.

## Solution

```javascript
function heal(target, actions) {
  actions.addHP(target, 50);
  actions.log(`${target} healed for 50`);
  // should NOT call actions.attack
}

test('heal only calls expected actions', () => {
  const actions = {
    addHP: jest.fn(),
    attack: jest.fn(),
    log: jest.fn(),
  };
  heal('Alice', actions);
  expect(actions.addHP).toHaveBeenCalledWith('Alice', 50);
  expect(actions.log).toHaveBeenCalledWith('Alice healed for 50');
  expect(actions.attack).not.toHaveBeenCalled();
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
function heal(target, actions) {
  actions.addHP(target, 50);
  actions.log(`${target} healed for 50`);
  // should NOT call actions.attack
}

test('heal only calls expected actions', () => {
  const actions = {
    addHP: jest.fn(),
    attack: jest.fn(),
    log: jest.fn(),
  };
  heal('Alice', actions);
  // TODO: Assert that actions.addHP was called with the expected arguments.
  // TODO: Assert that actions.log was called with the expected arguments.
  // TODO: Assert that actions.attack was not called.
});
```
