# mockImplementation

**Level:** 31
**ID:** `jest-31`
**XP:** 150
**Tags:** `mockImplementation`, `jest.fn`, `implementation`

## Objective

Use mockImplementation to provide a custom function body.

## Story

The shape-shifter takes any form. Give it a real implementation with mockImplementation.

## Hints
1. multiply.mockImplementation((a, b) => a * b)
2. Equivalent to jest.fn((a, b) => a * b).
3. Use mockImplementationOnce for a single call.

## Solution

```javascript
const multiply=jest.fn().mockImplementation((a,b)=>a*b);
test('multiplies correctly',()=>{expect(multiply(3,4)).toBe(12);expect(multiply(5,5)).toBe(25);});
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
const multiply = jest.fn();

// TODO: mockImplementation that returns a * b

test('multiplies correctly', () => {
  expect(multiply(3, 4)).toBe(12);
  expect(multiply(5, 5)).toBe(25);
});
```
