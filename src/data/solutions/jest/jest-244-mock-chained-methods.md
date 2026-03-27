# Mock Chained Methods

**Level:** 244
**ID:** `jest-244`
**XP:** 130
**Tags:** `method chaining`, `mockReturnThis`, `jest.fn`

## Objective

Create a mock that supports method chaining.

## Story

The dungeon query builder chains methods. Mock the full chain.

## Hints
1. mockReturnThis() returns the mock object itself, enabling chaining.
2. The final .execute() returns the actual data.
3. Verify each chained method was called with the right args.

## Solution

```javascript
test('mock method chain', () => {
  const query = {
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnValue([{ id: 1 }, { id: 2 }]),
  };

  const results = query
    .where('level > 5')
    .orderBy('name')
    .limit(10)
    .execute();
  expect(results).toHaveLength(2);
  expect(query.where).toHaveBeenCalledWith('level > 5');
  expect(query.orderBy).toHaveBeenCalledWith('name');
  expect(query.limit).toHaveBeenCalledWith(10);
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
test('mock method chain', () => {
  const query = {
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnValue([{ id: 1 }, { id: 2 }]),
  };

  const results = query
    .where('level > 5')
    .orderBy('name')
    .limit(10)
    .execute();

  // TODO: Assert that results has length 2.
  // TODO: Assert that query.where was called with the expected arguments.
  // TODO: Assert that query.orderBy was called with the expected arguments.
  // TODO: Assert that query.limit was called with the expected arguments.
});
```
