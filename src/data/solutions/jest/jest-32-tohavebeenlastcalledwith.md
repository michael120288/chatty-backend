# toHaveBeenLastCalledWith

**Level:** 32
**ID:** `jest-32`
**XP:** 150
**Tags:** `toHaveBeenLastCalledWith`, `mocks`, `calls`

## Objective

Use toHaveBeenLastCalledWith to assert the arguments of the most recent call.

## Story

Only the final message to the king matters. Assert the last call arguments.

## Hints
1. toHaveBeenLastCalledWith(...args) — checks the last call's arguments.
2. Equivalent to checking mock.calls[mock.calls.length - 1].
3. Use toHaveBeenNthCalledWith(n, ...args) for a specific call number.

## Solution

```javascript
const sendMessage=jest.fn();sendMessage('attack north');sendMessage('retreat east');sendMessage('hold position');
test('last order was hold position',()=>{expect(sendMessage).toHaveBeenLastCalledWith('hold position');});
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
const sendMessage = jest.fn();

sendMessage('attack north');
sendMessage('retreat east');
sendMessage('hold position');

test('last order was hold position', () => {
  // TODO: Assert that sendMessage was last called with the expected arguments.
});
```
