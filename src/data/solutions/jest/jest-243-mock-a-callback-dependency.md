# Mock a Callback Dependency

**Level:** 243
**ID:** `jest-243`
**XP:** 130
**Tags:** `callback`, `jest.fn`, `dependency`

## Objective

Test a function that accepts a callback by passing a jest.fn() as the argument.

## Story

The dungeon event handler is injected as a callback. Test it gets called correctly.

## Hints
1. Pass jest.fn() as the callback arguments.
2. Verify call count and arguments for each branch.
3. not.toHaveBeenCalled() asserts the callback was NOT triggered.

## Solution

```javascript
function processHeroes(heroes, onSuccess, onError) {
  const valid = heroes.filter(h => h.hp > 0);
  if (!valid.length) { onError('No valid heroes'); return; }
  valid.forEach(h => onSuccess(h));
}

test('calls onSuccess for each valid hero', () => {
  const onSuccess = jest.fn();
  const onError = jest.fn();
  processHeroes([
    { name: 'Alice', hp: 100 },
    { name: 'Bob', hp: 0 }, // invalid
    { name: 'Carol', hp: 50 },
  ], onSuccess, onError);
  expect(onSuccess).toHaveBeenCalledTimes(2);
  expect(onSuccess).toHaveBeenCalledWith({ name: 'Alice', hp: 100 });
  expect(onError).not.toHaveBeenCalled();
});

test('calls onError when no valid heroes', () => {
  const onSuccess = jest.fn();
  const onError = jest.fn();
  processHeroes([{ name: 'Dead', hp: 0 }], onSuccess, onError);
  expect(onError).toHaveBeenCalledWith('No valid heroes');
  expect(onSuccess).not.toHaveBeenCalled();
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
function processHeroes(heroes, onSuccess, onError) {
  const valid = heroes.filter(h => h.hp > 0);
  if (!valid.length) { onError('No valid heroes'); return; }
  valid.forEach(h => onSuccess(h));
}

test('calls onSuccess for each valid hero', () => {
  const onSuccess = jest.fn();
  const onError = jest.fn();
  processHeroes([
    { name: 'Alice', hp: 100 },
    { name: 'Bob', hp: 0 }, // invalid
    { name: 'Carol', hp: 50 },
  ], onSuccess, onError);
  // TODO: Assert that onSuccess was called exactly 2 times.
  // TODO: Assert that onSuccess was called with the expected arguments.
  // TODO: Assert that onError was not called.
});

test('calls onError when no valid heroes', () => {
  const onSuccess = jest.fn();
  const onError = jest.fn();
  processHeroes([{ name: 'Dead', hp: 0 }], onSuccess, onError);
  // TODO: Assert that onError was called with the expected arguments.
  // TODO: Assert that onSuccess was not called.
});
```
