# Inspecting mock.calls

**Level:** 27
**ID:** `jest-27`
**XP:** 150
**Tags:** `mock.calls`, `jest.fn`, `mocks`

## Objective

Access mock.calls to assert on individual call arguments.

## Story

The spy recorded every conversation. Inspect mock.calls to see what was said.

## Hints
1. spy.mock.calls is an array of argument arrays.
2. spy.mock.calls[0] is the args of the first call.
3. spy.mock.calls[0][0] is the first arg of the first call.

## Solution

```javascript
const spy=jest.fn();spy('first',1);spy('second',2);spy('third',3);
test('spy was called 3 times',()=>{expect(spy.mock.calls).toHaveLength(3);});
test('first call args',()=>{expect(spy.mock.calls[0]).toEqual(['first',1]);});
test('second call first arg',()=>{expect(spy.mock.calls[1][0]).toBe('second');});
```

## Explanation

`jest.mock('moduleName')` replaces an entire module with auto-mocked or custom implementations.

```
jest.mock('../services/api');
import { fetchUser } from '../services/api';
fetchUser.mockResolvedValue({ id: 1, name: 'Aria' });

it('loads user', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('Aria');
});
```

The mock is hoisted automatically to the top of the file — it applies before any imports.

## Starter Code

```javascript
const spy = jest.fn();
spy('first', 1);
spy('second', 2);
spy('third', 3);

test('spy was called 3 times', () => {
  expect(spy.mock.calls).toHaveLength(3);
});

test('first call args', () => {
  // TODO: Assert that spy.mock.calls[0] deeply equals the expected value using .toEqual().
});

test('second call first arg', () => {
  // TODO: Assert that spy.mock.calls[1][0] equals 'second' using .toBe().
});
```
