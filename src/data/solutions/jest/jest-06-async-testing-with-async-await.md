# Async Testing with async/await

**Level:** 6
**ID:** `jest-06`
**XP:** 150
**Tags:** `async`, `await`, `promises`

## Objective

Write an async test that awaits a Promise and asserts on the resolved value.

## Story

The Time Keeper's API is asynchronous. You must await the result before asserting on it — or the test will pass before the promise resolves.

## Hints
1. Mark the test callback as async.
2. Use await to unwrap the promise before asserting.
3. const result = await fetchTreasure(); then expect(result).toBe(...)

## Solution

```javascript
function fetchTreasure() { return Promise.resolve('gold coins'); }
test('fetchTreasure resolves to gold coins', async () => {
  const result = await fetchTreasure();
  expect(result).toBe('gold coins');
});
```

## Explanation

`expect(value).toEqual(expected)` does a **deep equality** check — it compares object/array contents recursively, unlike `toBe` which uses `===`.

```
expect({ a: 1, b: [2, 3] }).toEqual({ a: 1, b: [2, 3] }); // passes
expect({ a: 1 }).toBe({ a: 1 });                           // FAILS (different object refs)
```

## Starter Code

```javascript
function fetchTreasure() {
  return Promise.resolve('gold coins');
}

test('fetchTreasure resolves to gold coins', async () => {
  // TODO: const result = await fetchTreasure()
  // TODO: Assert that result equals 'gold coins' using .toBe().
});
```
