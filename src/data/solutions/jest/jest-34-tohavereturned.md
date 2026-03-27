# toHaveReturned

**Level:** 34
**ID:** `jest-34`
**XP:** 150
**Tags:** `toHaveReturned`, `toHaveReturnedWith`, `mocks`

## Objective

Use toHaveReturned and toHaveReturnedWith to assert return values.

## Story

The function must complete without throwing and actually return something.

## Hints
1. toHaveReturned() — passes if the mock returned at least once (did not throw).
2. toHaveReturnedWith(value) — checks if any call returned that value.
3. toHaveLastReturnedWith(value) — checks the last return value.

## Solution

```javascript
const craft=jest.fn(item=>`crafted ${item}`);craft('sword');craft('shield');
test('craft returned something',()=>{expect(craft).toHaveReturned();});
test('craft returned crafted sword',()=>{expect(craft).toHaveReturnedWith('crafted sword');});
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
const craft = jest.fn(item => `crafted ${item}`);

craft('sword');
craft('shield');

test('craft returned something', () => {
  // TODO: Assert the expected outcome using expect(craft).
});

test('craft returned crafted sword', () => {
  // TODO: Assert that craft returned the expected value.
});
```
