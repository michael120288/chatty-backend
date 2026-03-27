# toHaveBeenNthCalledWith

**Level:** 33
**ID:** `jest-33`
**XP:** 150
**Tags:** `toHaveBeenNthCalledWith`, `mocks`, `nth-call`

## Objective

Use toHaveBeenNthCalledWith to assert the arguments of a specific call.

## Story

The courier delivered three scrolls. Assert exactly what was in the second delivery.

## Hints
1. toHaveBeenNthCalledWith(n, ...args) — checks the nth call (1-indexed).
2. 2nd call: toHaveBeenNthCalledWith(2, ...).
3. Useful when testing that different calls had different arguments.

## Solution

```javascript
const deliver=jest.fn();deliver('scroll of fire');deliver('scroll of ice');deliver('scroll of lightning');
test('second delivery was ice',()=>{expect(deliver).toHaveBeenNthCalledWith(2,'scroll of ice');});
```

## Explanation

Async tests: use `async/await` or return a promise. Jest waits for the promise to resolve before marking the test as done.

```
it('fetches data', async () => {
  const data = await fetchSpells();
  expect(data).toHaveLength(3);
});

// Testing rejected promises
it('throws on error', async () => {
  await expect(fetchSpells('bad-id')).rejects.toThrow('Not found');
});
```

## Starter Code

```javascript
const deliver = jest.fn();
deliver('scroll of fire');
deliver('scroll of ice');
deliver('scroll of lightning');

test('second delivery was ice', () => {
  // TODO: Assert the expected outcome using expect(deliver).
});
```
