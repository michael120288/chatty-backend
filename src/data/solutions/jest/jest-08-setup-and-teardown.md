# Setup and Teardown

**Level:** 8
**ID:** `jest-08`
**XP:** 150
**Tags:** `beforeEach`, `afterEach`, `setup`, `teardown`

## Objective

Use beforeEach to initialize a value and afterEach to reset it. Write tests that depend on the setup.

## Story

The dungeon must be prepared before each battle and cleaned up after. Use beforeEach and afterEach to set up and tear down your test environment.

## Hints
1. beforeEach runs before every test in the current describe scope.
2. afterEach runs after every test — use it to clean up.
3. Each test starts fresh because beforeEach re-initializes dungeon.

## Solution

```javascript
let dungeon;
beforeEach(() => { dungeon = { monsters: 3, treasure: true }; });
afterEach(() => { dungeon = null; });
test('dungeon has monsters', () => { expect(dungeon.monsters).toBe(3); });
test('dungeon has treasure', () => { expect(dungeon.treasure).toBe(true); });
test('dungeon is reset between tests', () => { dungeon.monsters = 0; expect(dungeon.monsters).toBe(0); });
```

## Explanation

`expect(value).toEqual(expected)` does a **deep equality** check — it compares object/array contents recursively, unlike `toBe` which uses `===`.

```
expect({ a: 1, b: [2, 3] }).toEqual({ a: 1, b: [2, 3] }); // passes
expect({ a: 1 }).toBe({ a: 1 });                           // FAILS (different object refs)
```

## Starter Code

```javascript
let dungeon;

beforeEach(() => {
  // TODO: set dungeon = { monsters: 3, treasure: true }
});

afterEach(() => {
  // TODO: set dungeon = null
});

test('dungeon has monsters', () => {
  expect(dungeon.monsters).toBe(3);
});

test('dungeon has treasure', () => {
  expect(dungeon.treasure).toBe(true);
});

test('dungeon is reset between tests', () => {
  dungeon.monsters = 0;
  expect(dungeon.monsters).toBe(0);
});
```
