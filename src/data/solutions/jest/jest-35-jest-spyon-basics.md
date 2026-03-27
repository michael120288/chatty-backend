# jest.spyOn Basics

**Level:** 35
**ID:** `jest-35`
**XP:** 150
**Tags:** `jest.spyOn`, `spy`, `mockRestore`

## Objective

Use jest.spyOn to spy on an existing method while keeping its implementation.

## Story

Spy on the blacksmith's hammer method without replacing it.

## Hints
1. jest.spyOn(obj, 'method') wraps the method and returns a mock.
2. The original implementation still runs.
3. Call spy.mockRestore() after the test to undo the spy.

## Solution

```javascript
const blacksmith={hammer(item){return`forged: ${item}`;}};
test('spy tracks calls',()=>{const spy=jest.spyOn(blacksmith,'hammer');const result=blacksmith.hammer('sword');expect(result).toBe('forged: sword');expect(spy).toHaveBeenCalledWith('sword');spy.mockRestore();});
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
const blacksmith = {
  hammer(item) {
    return `forged: ${item}`;
  }
};

test('spy tracks calls without replacing implementation', () => {
  const spy = jest.spyOn(blacksmith, 'hammer');

  const result = blacksmith.hammer('sword');

  // TODO: Assert that result equals 'forged: sword' using .toBe().
  // TODO: Assert that spy was called with the expected arguments.

  spy.mockRestore();
});
```
